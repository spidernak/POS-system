/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Profile from "./profile";
import Checkout from "./checkout";
import "../../App.css";

const Cart = ({ cartItems, setCartItems, updateProductQuantities }) => {
  const [dateTime, setDateTime] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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

  // Function to increment quantity
  const incrementQuantity = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Function to decrement quantity
  const decrementQuantity = (id, size) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.selectedSize === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Update date and time when cart items change
  useEffect(() => {
    updateDateTime();
  }, [cartItems]);

  const handleOrderConfirm = (formData) => {
    setOrderDetails({
      ...formData,
      cartItems,
      totalPrice: cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
    });
    setIsConfirmed(true);
    setIsCheckout(false);

    // Update product quantities after checkout
    updateProductQuantities(cartItems);
  };

  const handleBackToOrder = () => {
    setIsConfirmed(false);
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
    } else {
      setIsCheckout(true);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full bg-white shadow-lg flex flex-col z-50">
      <Profile />
      <div className="w-[430px] border p-1 h-full scroll mt-[90px] flex flex-col justify-between items-center">
        <div className="w-[410px] flex flex-col justify-center items-center">
          <div className="flex flex-col w-[410px] fixed top-[100px] ">
            <h1 className="bg-customRed w-full flex justify-center text-4xl items-center text-white h-[60px] ">
              {isCheckout
                ? "Checkout"
                : isConfirmed
                ? "Order Confirmation"
                : "Cart"}
            </h1>
            <div className="w-full flex justify-start py-1 font-kotta-one ">
              {dateTime && <p>Date and Time: {dateTime}</p>}
            </div>
          </div>
          <div>
            {isCheckout ? (
              <Checkout
                cartItems={cartItems}
                setCartItems={setCartItems}
                setIsCheckout={setIsCheckout}
                handleOrderConfirm={handleOrderConfirm}
              />
            ) : isConfirmed ? (
              <OrderConfirmation
                orderDetails={orderDetails}
                handleBackToOrder={handleBackToOrder}
              />
            ) : (
              cartItems.map((item, index) => (
                <CartItem
                  key={`${item.id}-${item.selectedSize}-${index}`}
                  item={item}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {!isCheckout && !isConfirmed && (
        <>
        <div className="h-[300px] bg-white flex flex-col">
          <div>

          </div>
          <div className="flex justify-between w-full px-2 py-2 font-inria-sans">
            <div>Total Price:</div>
            <div>
              $
              {cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </div>
          </div>
        </div>
          
          <button
            className="bg-customRed text-white px-4 py-2 mx-2 my-2 rounded-md"
            onClick={handleProceedToCheckout}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

const CartItem = ({ item, incrementQuantity, decrementQuantity }) => (
  <section className="">
    <div className="flex w-[410px] mb-5 p-1 items-center bg-white border rounded-md shadow-testShadow gap-2">
      <div>
        <img
          className="w-[80px] h-[80px] rounded-[10px]"
          src={item.image}
          alt={`${item.name} image`}
        />
      </div>
      <div className="flex it text-xl font-inria-sans font-semibold flex-col">
        <div>
          {item.name} (Size: {item.selectedSize.charAt(0)})
        </div>
        <div className="w-[310px] flex justify-between">
          <div className="flex items-center">${item.price}</div>
          <div className="flex pl-10 items-center">
            <div
              className="w-[30px] h-[30px]  flex items-center justify-center cursor-pointer hover:bg-customRed hover:text-white border rounded"
              onClick={() => decrementQuantity(item.id, item.selectedSize)}
            >
              <i className="ri-subtract-line"></i>
            </div>
            <div className="px-2 py-2">{item.quantity}</div>
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
);

const OrderConfirmation = ({ orderDetails, handleBackToOrder }) => (
  <div className="flex flex-col items-center">
    <h2 className="text-xl font-semibold">Order Confirmation</h2>
    <p>Name: {orderDetails.name}</p>
    <p>Address: {orderDetails.address}</p>
    <p>Payment Method: {orderDetails.paymentMethod}</p>
    <h3 className="text-lg font-semibold mt-2">Order Summary</h3>
    {orderDetails.cartItems.map((item, index) => (
      <div
        key={`${item.id}-${item.selectedSize}-${index}`}
        className="flex justify-between w-full"
      >
        <div>
          {item.name} (x{item.quantity})
        </div>
        <div>${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    ))}
    <div className="flex justify-between w-full mt-2 font-bold">
      <div>Total Price:</div>
      <div>${orderDetails.totalPrice}</div>
    </div>
    <button
      className="bg-customRed text-white px-4 py-2 rounded-md mt-2"
      onClick={handleBackToOrder}
    >
      Back to Order
    </button>
  </div>
);

export default Cart;
