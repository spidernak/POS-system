/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Checkout = ({ cartItems, setCartItems, setIsCheckout, isCheckout }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'Credit Card',
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (formData.name && formData.address) {
      alert('Order placed successfully!');
      // Perform further actions like API call to place the order
      setCartItems([]);
      setFormData({
        name: '',
        address: '',
        paymentMethod: 'Credit Card',
      });
      setIsCheckout(false);
    } else {
      alert('Please fill in all the details.');
    }
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="w-[380px] flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold">Checkout Details</h2>
      <div className="mt-4">
        <label className="block">
          Name:
          
        </label>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
        <label className="block mt-2">
          Address:
          
        </label>
        <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
        <label className="block mt-2">
          Payment Method:
        </label>
        <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
      </div>
      <div className='flex flex-col h-[300px] justify-end'>
        <div className="flex justify-between w-[360px] px-2 py-2 font-inria-sans mt-4">
        <div>Total Price:</div>
        <div>${calculateTotalPrice()}</div>
      </div>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={handleCheckout}
      >
        Confrim
      </button>
      <button
        className="bg-customRed text-white px-4 py-2 rounded-md mt-2"
        onClick={() => setIsCheckout(false)}
      >
        Back to Cart
      </button>
      </div>
      
    </div>
  );
};

export default Checkout;
