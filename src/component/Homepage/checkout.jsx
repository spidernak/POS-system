import React, { useState } from 'react';
import qrCodeImage from '../../assets/qr_cod.jpg';
import '../../App.css';

const Checkout = ({ cartItems, setCartItems, setIsCheckout, handleOrderConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    customerCode: '',
    paymentMethod: 'Qr_code',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle checkout process
 // Handle checkout process
const handleCheckout = () => {
  const orderData = {
    name: formData.name,
    customerCode: formData.customerCode,
    paymentMethod: formData.paymentMethod,
    products: cartItems.map(item => ({
      Product_id: item.id,
      Quantity: item.quantity,
      Total_price: (item.sizePrice[item.selectedSize] * item.quantity).toFixed(2),
    })),
  };

  handleOrderConfirm(orderData);
  setCartItems([]);
  setFormData({
    name: '',
    customerCode: '',
    paymentMethod: 'Qr_code',
  });
  setIsCheckout(false);
};


  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.sizePrice[item.selectedSize] * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="w-[400px] flex flex-col">
      <div className="max-h-[570px]">
        <div className="text-2xl font-inria-sans">
          <label className="block">Invoice Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
          <label className="block mt-2">Customer Code:</label>
          <input
            type="text"
            name="customerCode"
            value={formData.customerCode}
            onChange={handleInputChange}
            className="border p-1 rounded w-full"
          />
          <label className="block mt-2">Payment Method:</label>
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
          <div className="flex justify-center">
            <img src={qrCodeImage} alt="QR Code" className="w-[300px] h-[300px]" />
          </div>
        )}
      </div>
      <div className="w-[380px] flex flex-col fixed bg-white pb-2 bottom-0">
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
