/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from 'react';
import qrCodeImage from '../../assets/qr_cod.jpg';
import '../../App.css';
import { OrderContext } from '../Context/OrderContext';
import { getNextInvoiceNumber } from '../../utils/invoiceGen';

const Checkout = ({ cartItems, setCartItems, setIsCheckout, handleOrderConfirm }) => {
  const { setOrderDetails } = useContext(OrderContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: 'Qr_code',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (formData.name && formData.address) {
      const updatedCartItems = cartItems
        .map((item) => ({
          ...item,
          quantity: item.quantity - 1,
        }))
        .filter((item) => item.quantity > 0);

      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      const invoiceNumber = getNextInvoiceNumber();

      setOrderDetails((prevOrders) => [
        ...prevOrders,
        {
          ...formData,
          totalPrice,
          date: new Date().toLocaleString(),
          invoice: invoiceNumber,
          cashier: user?.name,
        },
      ]);

      handleOrderConfirm(formData);

      setCartItems(updatedCartItems);
      setFormData({
        name: '',
        address: '',
        paymentMethod: 'Qr_code',
      });
      setIsCheckout(false);
    } else {
      alert('Please fill in all the details.');
    }
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="w-[380px] scroll mb-[160px] h-full py-5 flex flex-col justify-start items-center">
      <h2 className="text-xl font-semibold">Checkout Details</h2>
      <div className="pt-10">
        <label className="block" htmlFor="name">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-1 rounded w-full"
          id="name"
          aria-label="Name"
        />
        <label className="block mt-2" htmlFor="address">
          Address:
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="border p-1 rounded w-full"
          id="address"
          aria-label="Address"
        />
        <label className="block mt-2" htmlFor="paymentMethod">
          Payment Method:
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
          className="border p-1 rounded w-full"
          id="paymentMethod"
          aria-label="Payment Method"
        >
          <option value="Qr_code">Online Cash</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      {formData.paymentMethod === 'Qr_code' && (
        <div className="mt-4">
          <img src={qrCodeImage} alt="QR code for online payment" className="w-[300px] h-[300px]" />
        </div>
      )}
      <div className="w-[360px] flex flex-col fixed bg-white h-[150px] pb-2 bottom-0">
        <div className="flex justify-between w-[360px] px-2 py-2 font-inria-sans">
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
