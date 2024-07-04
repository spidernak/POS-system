import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: null, 
        gender: "" 
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();
    
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: file 
            });
            handlePhotoPreview(file);
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handlePhotoPreview = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name ? "Name is required" : "",
            email: !formData.email ? "Email is required" : "",
            password: !formData.password ? "Password is required" : "",
            gender: !formData.gender ? "Gender is required" : "",
            image: !formData.image ? "Image is required" : ""
        };
        
        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("image", formData.image); 
            formDataToSend.append("gender", formData.gender);

            const response = await axios.post("http://localhost:8005/api/createUser", formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("User created:", response.data);
            navigate("/admin/employee");
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                setServerError("An error occurred while creating the user. Please try again.");
                console.error("Error creating user:", err);
            }
        }
    };

    const back = () => {
        navigate("/admin/employee");
    };

    return (
        <div className="w-screen h-screen flex absolute bg-homeBg">
            <div className="w-full flex flex-col ml-[140px] px-5 py-5 gap-5">
                <div className="w-full flex gap-5 items-center">
                    <div
                        onClick={back}
                        className="flex items-center justify-center cursor-pointer hover:scale-105 bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
                    >
                        <i className="ri-arrow-left-fill text-3xl text-white"></i>
                    </div>
                    <h1 className="text-black text-3xl font-bold font-text"></h1>
                </div>
                <div className="w-full h-full flex-col py-5 px-10 flex bg-white shadow-testShadow rounded border">
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full justify-center items-center flex gap-10">
                        <div className="w-[300px] h-[340px] border rounded shadow-testShadow cursor-pointer hover:bg-gray-200 ">
                            {photoPreview ? (
                                <img src={photoPreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-gray-400">No photo selected</span>
                                </div>
                            )}
                        </div>
                        <div className="p-6 w-full max-w-lg rounded-lg border bg-homeBg">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                            <label className="block text-gray-700">Gender:</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    checked={formData.gender === "M"}
                    onChange={handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Male</span>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    checked={formData.gender === "F"}
                    onChange={handleChange}
                    className="form-radio ml-4"
                  />
                  <span className="ml-2">Female</span>
                </div>
                                {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
                            </div>
                            {serverError && <p className="text-red-500 text-xs italic">{serverError}</p>}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
