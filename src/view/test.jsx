// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ProductForm() {
    const [formData, setFormData] = useState({
        Product_name: '',
        Type_of_product: '',
        Image: null,
        size: '',
        Price: '',
        Product_Quantity: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const val = type === 'file' ? files[0] : value;
        setFormData({ ...formData, [name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('Product_name', formData.Product_name);
            formDataToSend.append('Type_of_product', formData.Type_of_product);
            formDataToSend.append('Image', formData.Image);
            formDataToSend.append('size', formData.size);
            formDataToSend.append('Price', formData.Price);
            formDataToSend.append('Product_Quantity', formData.Product_Quantity);

            const response = await fetch('http://localhost:8005/api/createpro', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log('Product created successfully:', data);
                navigate('/test');
            } else {
                console.log('Validation error:', data.errors);
                window.alert('There no this type of product in this system!!!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const back = () => {
        navigate("/test");
    }

    return (
        <div className="w-screen h-screen flex absolute bg-homeBg font-inria-sans">
            <div className="w-full flex flex-col ml-36 px-5 py-5 gap-5">
                <div className="w-full flex gap-5 items-center">
                    <button 
                        className="flex items-center  justify-center cursor-pointer hover:scale-105 bg-blue-500 text-white w-20 h-[50px] rounded shadow-lg border border-gray-300" 
                        onClick={back}
                    >
                        Back
                    </button>
                    <h1 className="text-black text-3xl font-bold">
                        Add Product
                    </h1>
                </div>
                <div className="w-full h-full flex-col py-5 px-10 flex bg-white shadow-lg rounded border">
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
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
                                className="mt-1 p-2  rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col font-inria-sans">
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
                        <button 
                            type="submit" 
                            onClick={handleSubmit}
                            className="mt-5 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
