import React, { useContext } from 'react';
import { OrderContext } from '../Context/OrderContext'; // Ensure this path is correct

const DisplayTransaction = () => {
  const { orderDetails } = useContext(OrderContext);

  const status = ['Date & Time', 'Invoice', 'Cahier', 'Customer', 'Price'];

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5">
        <div className="w-full flex justify-between ">
          <div>
            <h1 className="text-black text-3xl font-bold font-text">Transaction History</h1>
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
        <div className="w-full px-5 py-5 flex">
          {status.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-base text-black font-medium">{item}</span>
            </div>
          ))}
        </div>
        {orderDetails && (
          <div className="w-full px-5 py-5 flex flex-col">
            <div className="flex-1 text-center">
              <span className="text-base text-black font-medium">Name: {orderDetails.name}</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-base text-black font-medium">Address: {orderDetails.address}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayTransaction;
