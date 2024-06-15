import { useContext } from 'react';
import { OrderContext } from '../Context/OrderContext';
import '../../App.css'

const DisplayOrderDetails = () => {
  const { orderDetails } = useContext(OrderContext);

  const status = ['Date & Time', 'Invoice', 'Cashier', 'Customer', 'Price'];

  return (
    <div className="w-screen h-screen flex absolute ">
      <div className="w-full flex flex-col ml-[140px]  px-10 pl-5 py-5 bg-homeBg">
        <div className="w-full flex justify-between ">
          <div>
            <h1 className="text-black text-3xl font-bold font-text">Order History</h1>
          </div>
          <div className="relative w-[415px] max-h-[45px] flex">
            <input
              type="text"
              placeholder="Search invoice or order's ID"
              className="h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none"
            />
            <i className="ri-search-line cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"></i>
          </div>
        </div>
        <div className="w-full px-5 py-5 mt-5 flex bg-white shadow-testShadow border border-b-none rounded-t-md">
          {status.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-base text-black font-medium">{item}</span>
            </div>
          ))}
        </div>
        <div className='h-full scroll bg-white shadow-testShadow border border-t-none rounded-b-md'>
        {orderDetails.map((order, index) => (
          <div key={index} className="w-full px-5 py-5 flex border-b">
            <div className="flex-1 text-center">{order.date}</div>
            <div className="flex-1 text-center">{order.invoice}</div>
            <div className="flex-1 text-center">{order.cashier}</div>
            <div className="flex-1 text-center">{order.name}</div>
            <div className="flex-1 text-center text-blue-600">${order.totalPrice}</div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayOrderDetails;
