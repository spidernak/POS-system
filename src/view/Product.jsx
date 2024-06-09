/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { menu, product } from "../store/index";

const Product = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All Size");
  const [searchFocus, setSearchFocus] = useState(false); // State to handle search input focus

  const sizes = ["All Size", "Small", "Medium", "Large"];
  const lists = ["Name", "Category", "Size", "Quantity", "Price", "Status"];
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeDropdownOpen(false);
  };

  const handleSearchIconClick = () => {
    setSearchFocus(true); // Change the background color of the search input
  };
  const productList = product.filter((item) => {
    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (selectedSize === "All Size" ||
        item.sizes.includes(selectedSize.toLowerCase()))
    );
  });

  return (
    <div className="w-screen h-screen absolute bg-homeBg">
      <div className="ml-[140px]">
        <h1 className="text-black px-5 py-5 pb-0 text-3xl font-bold font-text">
          Product
        </h1>
        <div className=" bg-white flex m-5 flex-col p-10">
          <section className="flex">
            <div className="relative">
              <div
                className="w-[220px] max-h-[60px] py-2 border shadow-testShadow flex justify-between rounded-md items-center cursor-pointer"
                onClick={toggleCategoryDropdown}
              >
                <div className="pl-3">{selectedCategory}</div>
                <div className="pr-3">
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
              </div>
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 w-[220px] bg-white border shadow-testShadow z-10 rounded-md">
                  {menu.map((category) => (
                    <div
                      key={category.id}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                      onClick={() => handleCategorySelect(category.title)}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-6 h-6 mr-2"
                      />
                      {category.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                className="w-[180px] max-h-[45px] py-2 border shadow-testShadow flex justify-between rounded-md items-center cursor-pointer ml-3"
                onClick={toggleSizeDropdown}
              >
                <div className="pl-3">{selectedSize}</div>
                <div className="pr-3">
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
              </div>
              {isSizeDropdownOpen && (
                <div className="absolute left-0 w-[180px] bg-white border shadow-testShadow z-10 rounded-md">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSizeSelect(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-[415px] max-h-[45px] flex ">
              <input
                type="text"
                placeholder="Search"
                className={`h-full w-full py-3 pl-4 pr-10 shadow-testShadow text-base text-[#333333] outline-none rounded-md border-none ${
                  searchFocus ? "bg-yellow-300" : ""
                }`}
              />
              <i
                className="ri-search-line cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleSearchIconClick}
              ></i>
            </div>
          </section>
          {/* product */}
          {/* <section className="flex flex-col">
            <div className="flex justify-between text-center w-full text-xl pt-10  font-semibold font-text">
              {lists.map((list) => (
                <div key={list} className="w-full">
                  {list}
                </div>
              ))}
            </div>

            {productList.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-center text-lg py-3 px-10 border-t"
              >
                <div>
                  <img src={item.image} alt={item.name} />
                  <div>{item.name}</div>
                </div>
                <div>{item.category}</div>
                <div>{item.sizes.join(", ")}</div>
                <div>{item.quantity}</div>
                <div>${item.price}</div>
                <div></div>
              </div>
            ))}
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default Product;
