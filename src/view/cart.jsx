/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Profile from '../component/Homepage/profile';
import Checkout from '../component/Homepage/checkout';
import '../App.css';

const Cart = ({ cartItems, setCartItems }) => {
  const [dateTime, setDateTime] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);

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

  return (
    <div className="max-h-[100vh] bg-white">
      <Profile />
      <div className="bg-white w-[380px] h-[628px] flex flex-col justify-between items-center">
        <div className='w-[360px] flex flex-col justify-center items-center'>
          <h1 className="bg-customRed flex justify-center w-[380px] items-center text-white h-[46px] text-[24px]">
            {isCheckout ? 'Checkout' : 'Cart'}
          </h1>
          <div className="w-[380px] flex justify-start py-1 font-kotta-one">
            {dateTime && <p>Date and Time: {dateTime}</p>}
          </div>
          {/* Cart Items */}
          <div className='h-[350px] '>
            {isCheckout ? (
              <Checkout cartItems={cartItems} setCartItems={setCartItems} setIsCheckout={setIsCheckout} />
            ) : (
              cartItems.map((item) => (
                <section key={item.id} className="">
                  <div className="flex w-[360px] mb-5 justify-center items-center bg-white border p-2 rounded-md shadow-testShadow gap-2">
                    <div>
                      <img
                        className="w-[65px] rounded-[10px]"
                        src={item.image}
                        alt="Product Logo"
                      />
                    </div>
                    <div className="flex text-[15px] flex-col">
                      <div>
                        {item.name} (Size: {item.selectedSize})
                      </div>
                      <div className="w-[200px] flex justify-between">
                        <div>${item.price}</div>
                        <div className="flex items-center">
                          <div
                            className="cursor-pointer"
                            onClick={() => decrementQuantity(item.id, item.selectedSize)}
                          >
                            <i className="ri-subtract-line"></i>
                          </div>
                          <div className="px-2">{item.quantity}</div>
                          <div
                            className="cursor-pointer"
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
        {!isCheckout && (
          <div className="flex justify-between w-[380px] px-2 py-2 font-inria-sans">
            <div>Total Price:</div>
            <div>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
          </div>
        )}
        {!isCheckout && (
          <button
            className="bg-customRed text-white px-4 py-2 rounded-md"
            onClick={() => setIsCheckout((prev) => !prev)}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
