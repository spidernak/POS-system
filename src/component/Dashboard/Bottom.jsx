import React, { useState, useEffect } from 'react';
import '../../App.css';

const Bottom = ({ type, isVisible }) => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(isVisible); // Local state to manage section visibility
  const isVisibleClass = isOpen ? 'visible' : '';

  useEffect(() => {
    setIsOpen(isVisible); // Update local state when props change
    if (isVisible) {
      fetchProducts(); // Fetch products when section becomes visible
    }
  }, [isVisible]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8005/api/listproducts');
      const data = await response.json();
      if (data && Array.isArray(data.Product_information)) {
        setProducts(data.Product_information);
      } else {
        console.error('Fetched data does not contain expected array:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false); // Close the section
  };

  return (
    <div>
      <div className={`w-full flex justify-start px-5 gap-5 bottom-component  ${isVisibleClass}`}>
        {isOpen && type === 'bestSelling' && (
          <div className="absolute flex flex-col ml-[140px] w-[45%] h-[450px] bg-white shadow-testShadow border rounded px-5">
            <div className="font-inria-sans flex gap-4 pt-2">
              <h1 className="text-3xl">Best Selling</h1>
              <button className="ml-auto text-3xl text-gray-600" onClick={handleClose}>
                Close
              </button>
            </div>
            <div className="scroll my-4">
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <div>{product.Product_name}</div>
                  <div className="text-green-500">${product.Price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={`w-full flex justify-end px-5 gap-5  bottom-component ${isVisibleClass}`}>
        {isOpen && type === 'recentlyAdd' && (
          <div className="absolute flex flex-col ml-[140px] justify-end w-[45%] h-[450px] bg-white shadow-testShadow border rounded px-5">
            <div className="font-inria-sans flex gap-4 pt-2">
              <h1 className="text-3xl">Recently Add</h1>
              <button className="ml-auto text-3xl text-gray-600" onClick={handleClose}>
                Close
              </button>
            </div>
            <div className="scroll my-4">
              {products.map((product, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <div>{product.Product_name}</div>
                  <div className="text-green-500">${product.Price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bottom;
