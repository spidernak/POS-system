import React, { useState } from 'react';
import qrCodeImage from '../../assets/qr_cod.jpg';
import '../../App.css';

const Checkout = ({ cartItems, setCartItems, setIsCheckout, handleOrderConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'Qr_code', // Default payment method
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle checkout
  const handleCheckout = () => {
    if (formData.name && formData.address) {
      // Reduce the quantity of each item in the cart
      const updatedCartItems = cartItems.map((item) => ({
        ...item,
        quantity: item.quantity - 1, // Decrease quantity by 1
      })).filter((item) => item.quantity > 0); // Remove items with quantity 0

      // Call the function to handle order confirmation
      handleOrderConfirm(formData);

      // Update the cart items with the reduced quantities
      setCartItems(updatedCartItems);

      // Reset form data and checkout state
      setFormData({
        name: '',
        address: '',
        paymentMethod: 'Qr_code', // Reset payment method to default
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
    <div className="w-[380px] h-[650px] py-5 flex flex-col justify-center items-center ">
      <h2 className="text-xl font-semibold">Checkout Details</h2>
      <div className="mt-10 pt-10">
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
          <option value="Qr_code">Online Cash</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      {formData.paymentMethod === 'Qr_code' && (
        <div className="mt-4">
          <img src={qrCodeImage} alt="QR Code" className="w-[300px] h-[300px]" />
        </div>
      )}
      <div className="flex flex-col h-[300px] justify-end">
        <div className="flex justify-between w-[360px] px-2 py-2 font-inria-sans mt-4">
          <div>Total Price:</div>
          <div>${calculateTotalPrice()}</div>
        </div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handleCheckout}
        >
          Confirm
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
