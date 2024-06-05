/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { product } from '../store/index';

const Product = ({ addToCart }) => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size,
    }));
  };

  const handleAddToCart = (item) => {
    if (!selectedSizes[item.id]) {
      alert('Please select a size before adding to cart');
      return;
    }
    addToCart({ ...item, selectedSize: selectedSizes[item.id] });
    // Reset selected size after adding to cart
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [item.id]: undefined,
    }));
  };

  return (
    <div className="flex flex-col it gap-10 max-w-[1080px] w-[950px] pl-5 mx-auto">
      <h1 className="text-black -translate-x-[10px] text-3xl font-bold font-text">All</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-3">
        {product.map((item) => (
          <div
            key={item.id}
            className="w-[200px] h-[250px] flex flex-col font-inria-sans items-center pt-2 bg-white rounded-md shadow-testShadow"
          >
            <img src={item.image} className="h-[119px] w-[184px]" alt={item.name} />
            <div className="text-black font-semibold">{item.name}</div>
            <div className="flex w-[200px] gap-3 py-3 pl-2 justify-start font-inria-sans font-normal break-words">
              {item.sizes.map((size) => (
                <div
                  key={size}
                  className={`w-[50px] h-[27px] border-none rounded-sm cursor-pointer bg-bgSize flex justify-center ${
                    selectedSizes[item.id] === size ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => handleSizeClick(item.id, size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="flex justify-between w-[200px] px-2 font-inria-sans font-normal break-words">
              <div>${item.price}</div>
              <div
                className="flex w-[88px] h-[30px] border-none object-none bg-customRed px-4 rounded-sm shadow-testShadow cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <div>Add</div>
                <div>
                  <i className="ri-shopping-basket-2-line"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
