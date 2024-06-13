/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderDetails, setOrderDetails] = useState([]);

  return (
    <OrderContext.Provider value={{ orderDetails, setOrderDetails }}>
      {children}
    </OrderContext.Provider>
  );
};
