/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Product_name: "",
    Type_of_product: "",
    Image: null,
    size: "",
    Price: "",
    Product_Quantity: ""
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8005/api/listproducts/${productId}`);
      console.log('API Response:', response.data); // Log entire response for debugging
  
      const productData = response.data['Product status']; // Accessing product data under 'Product status'
  
      if (productData) {
        setFormData({
          Product_name: productData.Product_name || '',
          Type_of_product: productData.Type_of_product || '',
          size: productData.size || '',
          Price: productData.Price || '',
          Product_Quantity: productData.Product_Quantity || ''
        });
  
        if (productData.Image) {
          setPhotoPreview(`http://localhost:8005/storage/${productData.Image}`);
        } else {
          setPhotoPreview('');
        }
      } else {
        console.error("Product data is empty or undefined.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === "file" ? files[0] : value;
    setFormData({ ...formData, [name]: val });

    if (type === "file") {
      setPhotoPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8005/api/updatepro/${productId}`, formData);
      console.log('Product updated successfully:', response.data);
      navigate("/admin/product");
      // Optionally, navigate back to product list or show success message
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation error:', error.response.data);
        // Handle validation errors, possibly display them to the user
      } else {
        console.error('Error updating product:', error);
        // Handle other types of errors (network, server, etc.)
      }
    }
  };
  
  

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg font-inria-sans">
      <div className="w-full flex flex-col ml-36 px-5 py-5 gap-5">
        <div className="w-full flex gap-5 items-center">
          <button
            className="flex items-center justify-center cursor-pointer hover:scale-105 bg-blue-500 text-white w-20 h-[50px] rounded shadow-lg border border-gray-300"
            onClick={() => navigate("/test")}
          >
            Back
          </button>
          <h1 className="text-black text-3xl font-bold">Update Product</h1>
        </div>
        <div className="w-full h-full py-5 px-10 flex bg-white shadow-lg rounded border">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-10 justify-center items-center">
              <div className="w-[300px] h-[340px] border rounded shadow-testShadow cursor-pointer hover:bg-gray-200">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">No photo selected</span>
                  </div>
                )}
              </div>
              <div className="flex w-[500px] flex-col gap-5 border p-5 rounded shadow-lg bg-homeBg">
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Product Name:</label>
                  <input
                    type="text"
                    name="Product_name"
                    value={formData.Product_name}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Type of Product:</label>
                  <input
                    type="text"
                    name="Type_of_product"
                    value={formData.Type_of_product}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Image:</label>
                  <input
                    type="file"
                    name="Image"
                    onChange={handleChange}
                    className="mt-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Size:</label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Price:</label>
                  <input
                    type="number"
                    name="Price"
                    value={formData.Price}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg font-medium">Product Quantity:</label>
                  <input
                    type="number"
                    name="Product_Quantity"
                    value={formData.Product_Quantity}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-start gap-2 mt-5">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
