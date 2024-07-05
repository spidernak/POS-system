import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Product_name: "",
    Type_of_product: "",
    Image: null,
    size: "",
    Price: "",
    Product_Quantity: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();

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
      const formDataToSend = new FormData();
      formDataToSend.append("Product_name", formData.Product_name);
      formDataToSend.append("Type_of_product", formData.Type_of_product);
      formDataToSend.append("Image", formData.Image);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("Price", formData.Price);
      formDataToSend.append("Product_Quantity", formData.Product_Quantity);

      const response = await fetch("http://localhost:8005/api/createpro", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Product created successfully:", data);
        onClose(); // Close the modal on successful submission
        navigate("/admin/product");
      } else {
        console.log("Validation error:", data.errors);
        window.alert("There is no such type of product in this system!!!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg font-inria-sans">
      <div className="w-full flex flex-col ml-36 px-5 py-5 gap-5">
        <div className="w-full flex gap-5 items-center">
          <button
            className="flex items-center justify-center cursor-pointer hover:scale-105 bg-blue-500 text-white w-20 h-[50px] rounded shadow-lg border border-gray-300"
            onClick={onClose}
          >
            Back
          </button>
          <h1 className="text-black text-3xl font-bold">Add Product</h1>
        </div>
        <div className="w-full h-full py-5 px-10 flex bg-white shadow-lg rounded border">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex gap-10 justify-center items-center">
              <div className="w-[300px] h-[340px] border rounded shadow-testShadow cursor-pointer hover:bg-gray-200">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
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
                  <label className="text-lg font-medium">
                    Type of Product:
                  </label>
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
                  <div className="mt-1 flex gap-3">
                    <input
                      type="radio"
                      name="size"
                      value="small"
                      checked={formData.size === "small"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="flex items-center">Small</label>
                    <input
                      type="radio"
                      name="size"
                      value="medium"
                      checked={formData.size === "medium"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="flex items-center">Medium</label>
                    <input
                      type="radio"
                      name="size"
                      value="large"
                      checked={formData.size === "large"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="flex items-center">Large</label>
                  </div>
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
                  <label className="text-lg font-medium">
                    Product Quantity:
                  </label>
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
                    Submit
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

export default ProductForm;
