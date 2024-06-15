/* eslint-disable react/prop-types */
import { useState } from "react";
import { product as allProducts } from "../../store/index";

const Product = ({ addToCart, selectedCategory, searchTerm, highlightSearch }) => {
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeClick = (productId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: size.charAt(0).toUpperCase(),
    }));
  };

  const handleAddToCart = (item) => {
    if (!selectedSizes[item.id]) {
      alert("Please select a size before adding to cart");
      return;
    }
    addToCart({ ...item, selectedSize: selectedSizes[item.id] });
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [item.id]: undefined,
    }));
  };

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const highlightSearchTerm = (text) => {
    if (!searchTerm || !highlightSearch) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-screen">
      <div className="max-w-full  ml-[140px]   mr-[450px]">
      <h1 className="text-black text-3xl pl-12 pb-10 font-bold font-text">
          {selectedCategory}
        </h1>
      <div className="flex flex-col w-full items-center  gap-10 px-10">
        
        <div className="  w-full grid grid-cols-1 pl-10 sm:grid-cols-2 md:grid-cols-4  xl:grid-cols-5 gap-10 pb-10">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer hover:scale-110 w-[220px] h-[270px] flex flex-col font-inria-sans items-center pt-2 bg-white rounded-md shadow-testShadow"
            >
              <img
                src={item.image}
                className="h-[140px] border-dashed w-[210px] rounded border"
                alt={item.name}
              />
              <div className="text-black font-semibold text-xl">
                {highlightSearchTerm(item.name)}
              </div>
              <div className="flex w-[200px] gap-3 py-3 pl-0  justify-start font-inria-sans font-normal break-words">
                {item.sizes.map((size) => (
                  <div
                    key={size}
                    className={`w-[50px] h-[27px] border-none rounded-sm cursor-pointer bg-bgSize flex justify-center ${
                      selectedSizes[item.id] === size.charAt(0).toUpperCase()
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    onClick={() => handleSizeClick(item.id, size)}
                  >
                    {size.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              <div className="flex justify-between w-[200px] px-2  font-inria-sans font-normal text-[20px] break-words">
                <div>${item.price}</div>
                <div
                  className="flex gap-2 w-[88px] h-[30px] border-none object-none bg-customRed px-4 rounded-sm shadow-testShadow cursor-pointer"
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
      </div>
    </div>
  );
};

export default Product;
