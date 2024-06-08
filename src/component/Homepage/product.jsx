/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { product as allProducts } from '../../store/index';

const Product = ({ add~ToCart, selectedCategory, searchTerm, highlightSearch }) => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeClick = (productId, size) => {
    const newSize = size.charAt(0).toUpperCase();

    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: newSize,
    }));
  };

  const handleAddToCart = (item) => {
    if (!selectedSizes[item.id]) {
      alert('Please select a size before adding to cart');
      return;
    }
    addToCart({ ...item, selectedSize: selectedSizes[item.id] });
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [item.id]: undefined,
    }));
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !highlightSearch) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? <span key={index} className="bg-yellow-300">{part}</span> : part
    );
  };

  return (
    <div className="flex flex-col gap-10 max-w-[1080px] w-[950px] pl-5 mx-auto">
      <h1 className="text-black -translate-x-[10px] text-3xl font-bold font-text">{selectedCategory}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-3">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="w-[200px] h-[250px] flex flex-col font-inria-sans items-center pt-2 bg-white rounded-md shadow-testShadow"
          >
            <img src={item.image} className="h-[119px] w-[184px]" alt={item.name} />
            <div className="text-black font-semibold">{highlightSearchTerm(item.name)}</div>
            <div className="flex w-[200px] gap-3 py-3 pl-2 justify-start font-inria-sans font-normal break-words">
              {item.sizes.map((size) => (
                <div
                  key={size}
                  className={`w-[50px] h-[27px] border-none rounded-sm cursor-pointer bg-bgSize flex justify-center ${
                    selectedSizes[item.id] === size.charAt(0).toUpperCase() ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => handleSizeClick(item.id, size)}
                >
                  {size.charAt(0).toUpperCase()}
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
