import React, { useState, useEffect } from 'react';
import Profile from './profile';
import Checkout from './checkout';
import '../../App.css';

const Cart = ({ cartItems, setCartItems, updateProductQuantities }) => {
  const [dateTime, setDateTime] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [change, setChange] = useState(null);

  // Function to update date and time
  const updateDateTime = () => {
    if (cartItems.length > 0) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
      setDateTime(`${formattedDate} ${formattedTime}`);
    } else {
      setDateTime(null);
    }
  };

  // Function to decrement quantity
  const decrementQuantity = (id, size) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  // Function to increment quantity
  const incrementQuantity = (id, size) => {
    const selectedItem = cartItems.find(item => item.id === id && item.selectedSize === size);

    // Check if the selected item exists
    if (selectedItem) {
      // Check if quantity can be incremented
      if (selectedItem.quantity < selectedItem.Product_Quantity) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === id && item.selectedSize === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert(`Cannot add more ${selectedItem.Product_name} (${size}) to the cart. Available quantity: ${selectedItem.Product_Quantity}`);
      }
    }
  };

  // Update date and time when cart items change
  useEffect(() => {
    updateDateTime();
  }, [cartItems]);

  // Handle order confirmation
  const handleOrderConfirm = formData => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.sizePrice[item.selectedSize] * item.quantity);
    }, 0);

    const orderData = {
      Customer_name: formData.name,
      Customer_code: formData.customerCode,
      Customer_loyalty: 0,
      products: cartItems.map(item => ({
        id: item.id,
        quantity: item.quantity,
        total_price: (item.sizePrice[item.selectedSize] * item.quantity).toFixed(2)
      })),
      paymentAmount: parseFloat(formData.paymentAmount), // Include payment amount in order data
    };

    fetch('http://localhost:8005/api/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order placed successfully:', data);
        setIsConfirmed(true);
        setPaymentAmount(formData.paymentAmount); // Set payment amount
        setChange(formData.paymentAmount - total); // Calculate change
        setOrderDetails({
          ...formData,
          cartItems,
          totalPrice: total.toFixed(2)
        });
        updateProductQuantities(cartItems);
        setCartItems([]);
      })
      .catch(error => {
        console.error('Error placing order:', error);
        // Handle errors here
      });
  };

  // Handle going back to order
  const handleBackToOrder = () => {
    setIsConfirmed(false);
    setCartItems([]);
  };

  // Handle proceeding to checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to your cart.');
    } else {
      setIsCheckout(true);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full bg-white shadow-lg flex flex-col z-50">
      <Profile />
      <div className="w-[430px] border h-full scroll mt-[90px] flex flex-col justify-between items-center">
        <div className="w-[410px] flex flex-col justify-center items-center">
          <div className="flex flex-col w-[410px] fixed top-[100px] ">
            <h1 className="bg-customRed w-full flex justify-center text-4xl items-center text-white h-[60px]">
              {isCheckout
                ? "Checkout"
                : isConfirmed
                ? "Order Confirmation"
                : "Cart"}
            </h1>
            <div className="w-full flex justify-start py-1 font-kotta-one">
              {dateTime && <p>Date and Time: {dateTime}</p>}
            </div>
          </div>
          <div className="scroll">
            {isCheckout ? (
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
                setIsCheckout={setIsCheckout}
                handleOrderConfirm={handleOrderConfirm}
              />
            ) : isConfirmed ? (
              orderDetails ? (
                <div className="flex flex-col w-[400px] text-2xl font-inria-sans">
                  <div>
                    <h2 className="text-xl font-semibold">Order Confirmation</h2>
                    <p>Name: {orderDetails.name}</p>
                    <p>Code: {orderDetails.customerCode}</p>
                    <p>Payment Method: {orderDetails.paymentMethod}</p>
                    <p>Payment Amount: ${paymentAmount}</p>
                    <p>Change: ${change}</p>
                    <h3 className="text-lg font-semibold mt-2">Order Summary</h3>
                    {orderDetails.cartItems.map((item, index) => (
                      <div
                        key={`${item.id}-${item.selectedSize}-${index}`}
                        className="flex justify-between w-full"
                      >
                        <div>
                          {item.Product_name} (x{item.quantity})
                        </div>
                        <div>
                          $
                          {(
                            item.sizePrice[item.selectedSize] * item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='fixed bottom-0 pb-4 text-2xl font-inria-sans w-[400px]'>
                    <div className="flex justify-between w-full mt-2 font-bold">
                      <div>Total Price:</div>
                      <div>${orderDetails.totalPrice}</div>
                    </div>
                    <button
                      className="bg-customRed w-[410px] text-white px-4 py-4 rounded-md mt-2"
                      onClick={handleBackToOrder}
                    >
                      Print
                    </button>
                  </div>
                </div>
              ) : (
                <p>Loading order details...</p>
              )
            ) : (
              cartItems.map((item, index) => (
                <section key={`${item.id}-${item.selectedSize}-${index}`} className="">
                  <div className="flex w-[410px] mb-3 p-1 items-center bg-white border rounded-md shadow-testShadow gap-2">
                    <div>
                      <img
                        src={`http://localhost:8005/storage/${item.Image}`}
                        alt={item.Product_name}
                        className="w-[80px] h-[80px] rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col text-xl font-inria-sans font-semibold">
                      <div>
                        {item.Product_name} (Size: {item.selectedSize.charAt(0)})
                      </div>
                      <div className="w-[310px] flex justify-between">
                        <div className="flex items-center">${item.sizePrice[item.selectedSize]}</div>
                        <div className="flex pl-10 items-center">
                          <div
                            className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-customRed hover:text-white border rounded"
                            onClick={() => decrementQuantity(item.id, item.selectedSize)}
                          >
                            <i className="ri-subtract-line"></i>
                          </div>
                          <div className="px-2">{item.quantity}</div>
                          <div
                            className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer hover:bg-customRed hover:text-white border rounded"
                            onClick={() => incrementQuantity(item.id, item.selectedSize)}
                          >
                            <i className="ri-add-line"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            )}
          </div>
        </div>
      </div>
      {!isCheckout && !isConfirmed && (
        <div className="h-[200px] w-full text-2xl font-inria-sans">
          <div className="flex flex-col">
            <div></div>
            <div className="flex justify-between w-full px-2 py-2 font-inria-sans">
              <div>Total Price:</div>
              <div>
                $
                {cartItems
                  .reduce(
                    (total, item) =>
                      total +
                      item.sizePrice[item.selectedSize] * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </div>
            </div>
          </div>
          <button
            className="bg-customRed w-[410px] text-white px-4 py-2 mx-2 my-2 rounded-md"
            onClick={handleProceedToCheckout}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
