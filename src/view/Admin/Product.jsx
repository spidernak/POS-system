// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddProduct from './Addproduct';
import ListType from "./listType";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showListType, setShowListType] = useState(false);
  const navigate = useNavigate();
  const headers = ["No", "Name", "Type", "Image", "Size", "Quantity", "Price", "Action"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8005/api/listproducts");
      setProducts(response.data.Product_information);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleCreate = () => {
    setShowAddProduct(true);
  };

  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8005/api/removepro/${productIdToDelete}`);
      fetchData(); // Refresh product list after deletion
      setShowModal(false);
      console.log('Product deleted successfully.');
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (productId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const listType = () => {
    setShowListType(true);
  };

  const closeAddProduct = () => {
    setShowAddProduct(false);
  };

  const closeListType = () => {
    setShowListType(false);
  };

  return (
    <div className="w-screen h-screen absolute flex bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5">

        <div className="w-full py-5 pb-0 flex flex-col bg-white shadow-testShadow border rounded-t-md">
          <div className="flex gap-5 px-5 items-center">
            <h1 className="text-3xl font-bold font-text bg-white text-blue-500 shadow-testShadow p-5 text-center rounded hover:scale-105 border">Product</h1>
            <div className="relative group">
              <button className="bg-blue-500 p-5 text-center text-3xl rounded hover:scale-105 shadow-testShadow border text-white" onClick={handleCreate}>
                <i className="ri-dossier-line"></i>
              </button>
              <div className="absolute top-10 translate-y-12 transform opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-sm rounded p-1">
                Add new product
              </div>
            </div>
            <div className="relative group">
              <button className="bg-blue-500 p-5 text-center text-3xl rounded hover:scale-105 shadow-testShadow border text-white" onClick={listType}>
                <i className="ri-article-line"></i>
              </button>
              <div className="absolute -top-0 left-[80px] transform opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-sm rounded p-1">
                List type of products
              </div>
            </div>
          </div>
          <div className="flex justify-between text-center w-full text-2xl mt-5 rounded shadow-testShadow bg-blue-500 text-white">
            {headers.map((header, index) => (
              <div key={index} className="w-full border-t-2 font-medium p-5">
                {header}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-full shadow-testShadow scroll bg-white border rounded-b-md">
          {products.map((product, index) => (
            <div key={index} className="w-full text-2xl font-inria-sans  py-3 flex border-b">
              <div className="flex-1 text-center">{index + 1}</div>
              <div className="flex-1 text-center">{product.Product_name}</div>
              <div className="flex-1 text-center">{product.Type_of_product}</div>
              <div className="flex-1 text-center">
                <img
                  src={`http://localhost:8005/storage/${product.Image}`}
                  alt={product.Image}
                  className="w-16 h-16 object-cover"
                />
              </div>
              <div className="flex-1 text-center">{product.size}</div>
              <div className="flex-1 text-center">{product.Product_Quantity}</div>
              <div className="flex-1 text-center">${product.Price}</div>
              <div className="flex-1 text-center flex justify-center gap-2">
                <button className="text-blue-500" onClick={() => handleUpdate(product.id)}>Update</button>
                <button className="text-red-500" onClick={() => confirmDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg mb-4">Are you sure you want to delete this product?</h2>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={cancelDelete}>Cancel</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showAddProduct && <AddProduct onClose={closeAddProduct} />}
      {showListType && <ListType onClose={closeListType} />}
    </div>
  );
};

export default ProductList;
