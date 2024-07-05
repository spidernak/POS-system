import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = ({ addToCart, selectedCategory, searchTerm, highlightSearch }) => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8005/api/listproducts");
      console.log("Fetched product data:", result.data.Product_information);
      const groupedProducts = groupProductsByName(result.data.Product_information);
      setProductData(groupedProducts);
    } catch (err) {
      console.error("Error fetching product data:", err);
    }
  };

  const groupProductsByName = (products) => {
    const grouped = products.reduce((acc, product) => {
      const existingProductIndex = acc.findIndex(
        (p) =>
          p.Product_name === product.Product_name &&
          p.Type_of_product === product.Type_of_product
      );

      if (existingProductIndex !== -1) {
        const existingProduct = acc[existingProductIndex];
        if (!existingProduct.availableSizes.includes(product.size.toLowerCase())) {
          existingProduct.availableSizes.push(product.size.toLowerCase());
          existingProduct.sizePrice[product.size.toLowerCase()] = product.Price;
        }
        // Update quantity if necessary
        existingProduct.Product_Quantity += product.Product_Quantity;
      } else {
        acc.push({
          ...product,
          availableSizes: [product.size.toLowerCase()],
          sizePrice: {
            [product.size.toLowerCase()]: product.Price,
          },
        });
      }
      return acc;
    }, []);

    return grouped;
  };

  const handleSizeChange = (productId, size) => {
    const product = productData.find((p) => p.id === productId);
    if (product) {
      const selectedSize = size.toLowerCase();
      if (product.availableSizes.includes(selectedSize)) {
        setSelectedSizes((prevSizes) => ({
          ...prevSizes,
          [productId]: selectedSize === prevSizes[productId] ? undefined : selectedSize,
        }));
      } else {
        alert(`Size ${size} is not available for this product.`);
      }
    }
  };

  const handleAddToCart = (item) => {
    if (!selectedSizes[item.id]) {
      alert("Please select a size before adding to cart");
      return;
    }

    const selectedSize = selectedSizes[item.id];
    const price = item.sizePrice[selectedSize];

    // Check if product quantity is 0
    if (item.Product_Quantity === 0) {
      alert("This item is sold out.");
      return;
    }

    // Check if selected quantity exceeds available Product_Quantity
    if (item.quantity > item.Product_Quantity) {
      alert(`Cannot add more than available quantity (${item.Product_Quantity})`);
      return;
    }

    addToCart({ ...item, selectedSize, price });
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [item.id]: undefined,
    }));
  };

  const sizeLabel = (size) => {
    switch (size.toLowerCase()) {
      case "small":
        return "S";
      case "medium":
        return "M";
      case "large":
        return "L";
      default:
        return size.toUpperCase();
    }
  };

  const getProductPrice = (product) => {
    if (selectedSizes[product.id]) {
      return product.sizePrice[selectedSizes[product.id]];
    } else {
      const smallestSize = product.availableSizes.reduce((smallest, current) => {
        if (!smallest || product.sizePrice[current] < product.sizePrice[smallest]) {
          return current;
        } else {
          return smallest;
        }
      }, null);

      return product.sizePrice[smallestSize];
    }
  };

  const filteredProducts = productData.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.Type_of_product === selectedCategory;
    const matchesSearchTerm = product.Product_name.toLowerCase().includes(searchTerm.toLowerCase());
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
      <div className="max-w-full ml-[140px] mr-[450px]">
        <h1 className="text-black text-3xl pl-12 pb-10 font-bold font-text">
          {selectedCategory}
        </h1>
        <div className="flex flex-col w-full items-center gap-10 px-10">
          <div className="w-full grid grid-cols-1 pl-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10 pb-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer hover:scale-110 w-[220px] h-[270px] flex flex-col font-inria-sans items-center pt-2 bg-white rounded-md shadow-testShadow"
              >
                <img
                  src={`http://localhost:8005/storage/${product.Image}`}
                  alt={product.Product_name}
                  className="w-16 h-16 object-cover"
                />
                <div className="text-black font-semibold text-xl">
                  {highlightSearchTerm(product.Product_name)}
                </div>
                <div className="flex flex-col w-[200px] gap-3 py-3 pl-2 justify-start font-inria-sans font-normal break-words">
                  <div className="flex justify-around">
                    {["small", "medium", "large"].map((size) => (
                      <div
                        key={size}
                        className={`w-[50px] h-[27px] border-none rounded-sm cursor-pointer bg-bgSize flex justify-center ${
                          selectedSizes[product.id] === size.toLowerCase()
                            ? "bg-blue-500 text-white"
                            : product.availableSizes.includes(size.toLowerCase())
                            ? product.Product_Quantity === 0
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : "bg-gray-200 text-black"
                            : "bg-red-500 text-white cursor-not-allowed"
                        }`}
                        onClick={() => handleSizeChange(product.id, size)}
                      >
                        {sizeLabel(size)}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between w-[200px] px-2 font-inria-sans font-normal break-words">
                  <div>${getProductPrice(product)}</div>
                  <div
                    className={`flex w-[88px] h-[30px] border-none object-none ${
                      selectedSizes[product.id] ? "bg-customRed " : "bg-gray-300"
                    } px-4 rounded-sm shadow-testShadow cursor-pointer`}
                    onClick={() => handleAddToCart(product)}
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
