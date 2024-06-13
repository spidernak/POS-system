import React, { useState } from "react";
import { menu, product } from "../store/index";
import "../App.css";

const ListProduct = () => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const sizes = ["All Size", "Small", "Medium", "Large"];
  const lists = ["Name", "Category", "Size", "Quantity", "Price", "Status"];

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    setIsSizeDropdownOpen(false); // Close size dropdown if open
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
    setIsCategoryDropdownOpen(false); // Close category dropdown if open
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
    setSearchFocus(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const getStatusAndColor = (quantity) => {
    if (quantity === 0) {
      return { status: "Empty", color: "bg-Red text-white" };
    } else if (quantity < 5) {
      return { status: "In Stock", color: "bg-Red" };
    } else if (quantity < 10) {
      return { status: "In Stock", color: "bg-Yellow" };
    } else {
      return { status: "In Stock", color: "bg-Green" };
    }
  };

  const productList = product.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSize =
      selectedSize === "All Size" ||
      item.sizes.includes(selectedSize.toLowerCase());
    const matchesSearchTerm = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSize && matchesSearchTerm;
  });

  return (
    <div className="w-screen h-screen flex absolute ">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5 bg-homeBg">
        <div>
          <h1 className="text-black text-3xl font-bold font-text">Product List</h1>
        </div>
        <div className="w-full px-5 py-5 mt-5 flex flex-col bg-white border border-b-none rounded-t-md">
          <section className="flex">
            {/* Category Dropdown */}
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
                <div className="absolute left-0 w-[220px] bg-white border shadow-testShadow z-10 rounded-md mt-1">
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
            {/* Size Dropdown */}
            <div className="relative ml-4">
              <div
                className="w-[220px] max-h-[60px] py-2 border shadow-testShadow flex justify-between rounded-md items-center cursor-pointer"
                onClick={toggleSizeDropdown}
              >
                <div className="pl-3">{selectedSize}</div>
                <div className="pr-3">
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
              </div>
              {isSizeDropdownOpen && (
                <div className="absolute left-0 w-[220px] bg-white border shadow-testShadow z-10 rounded-md mt-1">
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
            {/* Search Input */}
            <div className="relative ml-4 max-w-[420px] flex flex-1">
              <input
                type="text"
                placeholder="Search"
                className={`h-full w-full py-3 pl-4 pr-10 shadow-testShadow border rounded text-base text-[#333333] outline-none ${
                  searchFocus ? "" : ""
                }`}
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i
                className="ri-search-line cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleSearchIconClick}
              ></i>
            </div>
          </section>

          {/* Product List Header */}
          <div className="flex justify-between text-center w-full text-xl pt-10 font-semibold font-text">
            {lists.map((list) => (
              <div key={list} className="w-1/6">
                {list}
              </div>
            ))}
          </div>
        </div>
        <div className="h-full scroll bg-white border border-t-none rounded-b-md">
          {productList.map((item) => {
            const sizeToShow =
              selectedSize === "All Size" ? item.sizes : [selectedSize.toLowerCase()];
            return sizeToShow.map((size) => {
              const quantity = item.quantity[size];
              const { status, color } = getStatusAndColor(quantity);
              return (
                <div
                  key={`${item.id}-${size}`}
                  className="w-full px-5 py-5 flex border-b max-h-[70px]"
                >
                  <div className="flex flex-1 text-center items-center">
                    <img
                      src={item.image}
                      className="w-[50px] h-[50px] border rounded-sm mr-2"
                      alt={item.name}
                    />
                    <div>{item.name}</div>
                  </div>
                  <div className="flex-1 text-center">{item.category}</div>
                  <div className="flex-1 text-center">{size.charAt(0).toUpperCase() + size.slice(1)}</div>
                  <div className="flex-1 text-center">{quantity}</div>
                  <div className="flex-1 text-center">${item.price}</div>
                  <div className={`flex-1 text-center  ${color} rounded-md`}>
                    {status}
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
