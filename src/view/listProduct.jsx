/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { menu } from "../store/index";
import "../App.css";
import axios from "axios";

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All Size");
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sizes = ["All Size", "Small", "Medium", "Large"];
  const lists = ["Name", "Category", "Size", "Price", "Quantity", "Status"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8005/api/listproducts");
      setProduct(result.data.Product_information || []);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

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
    setSearchFocus(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const productList = product.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.Type_of_product === selectedCategory;
    const matchesSize =
      selectedSize === "All Size" ||
      item.size.toLowerCase() === selectedSize.toLowerCase();
    const matchesSearchTerm =
      item.Product_name.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSize && matchesSearchTerm;
  });

  const getStatus = (quantity) => {
    if (quantity === 0) return { text: "Out of stock", color: "red" };
    if (quantity <= 10) return { text: "Low stock", color: "red" };
    return { text: "In stock", color: "green" };
  };

  return (
    <div className="w-screen h-screen absolute flex bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5">
        <h1 className="text-black text-3xl font-bold font-text">Product</h1>
        <div className="w-full px-5 py-5 mt-5 flex flex-col bg-white shadow-testShadow border border-b-none rounded-t-md">
          <section className="flex gap-3 mb-5">
            <div className="relative">
              <div
                className="w-[220px] h-[65px] text-2xl font-inria-sans font-medium py-2 border shadow-lg flex justify-between rounded-md items-center cursor-pointer"
                onClick={toggleCategoryDropdown}
              >
                <div className="pl-3">{selectedCategory}</div>
                <div className="pr-3">
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
              </div>
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 w-[220px] text-2xl font-inria-sans font-medium bg-white border shadow-lg z-10 rounded-md">
                  {menu.map((category) => (
                    <div
                      key={category.id}
                      className="px-3 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
                      onClick={() => handleCategorySelect(category.title)}
                    >
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-10 h-10 mr-2"
                      />
                      {category.title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div
                className="w-[180px] text-2xl font-inria-sans font-medium h-[65px] py-2 border shadow-lg flex justify-between rounded-md items-center cursor-pointer ml-3"
                onClick={toggleSizeDropdown}
              >
                <div className="pl-3">{selectedSize}</div>
                <div className="pr-3">
                  <i className="ri-arrow-down-s-fill"></i>
                </div>
              </div>
              {isSizeDropdownOpen && (
                <div className="text-2xl font-inria-sans font-medium absolute left-0 w-[180px] bg-white border shadow-lg z-10 rounded-md">
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

            <div className="relative w-[415px] h-[65px] border rounded text-2xl font-inria-sans font-medium flex ml-3">
              <input
                type="text"
                placeholder="Search"
                className={`h-full w-full py-3 pl-4 pr-10 shadow-testShadow border text-2xl font-inria-sans font-medium text-[#333333] outline-none rounded-md border-none ${
                  searchFocus ? "bg-yellow-300" : ""
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
        </div>

        <div className="w-full  flex-col flex">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {lists.map((list) => (
              <div key={list} className="flex-1 text-center">
                <span className="text-white font-medium text-2xl font-inria-sans">
                  {list}
                </span>
              </div>
            ))}
          </div>
          
        </div><div className="w-full h-full shadow-testShadow scroll bg-white border rounded-b-md">
            {productList.map((product, i) => (
              <div
                key={i}
                className="max-h-[90px] w-full  py-5 flex items-center border-b text-2xl font-inria-sans"
              >
                <div className="flex-1 flex items-center gap-2 ml-2 text-center">
                  <img
                    src={`http://localhost:8005/storage/${product.Image}`}
                    alt={product.Product_name}
                    className="w-[80px] h-[80px] object-cover rounded-[10px] overflow-hidden "
                  />
                  <div className="text-xl">{product.Product_name}</div>
                </div>
                <div className="flex-1 text-center">
                  {product.Type_of_product}
                </div>
                <div className="flex-1 text-center">{product.size}</div>
                <div className="flex-1 text-center">${product.Price}</div>
                <div className="flex-1 text-center">
                  {product.Product_Quantity}
                </div>
                <div
                  className="flex-1 text-center"
                  style={{ color: getStatus(product.Product_Quantity).color }}
                >
                  {getStatus(product.Product_Quantity).text}
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default ListProduct;
