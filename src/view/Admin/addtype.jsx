/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddType = ({ onClose }) => {
    const [type, setType] = useState({ Type: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setType({ ...type, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('Type', type.Type);

            const response = await axios.post('http://localhost:8005/api/createtypofpro', formDataToSend);
            console.log('New type of product created:', response.data);
            onClose(); // Navigate back to ListType
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
                console.error('Validation error:', err.response.data.errors);
            } else {
                window.alert('An error occurred while creating the type. Please try again.');
                console.error('Something went wrong:', err);
            }
        }
    };

    return (
        <div className="mx-auto w-[600px] flex flex-col gap-5 rounded bg-white p-6">
            <button
                className="font-inria-sans bg-customRed w-[90px] p-1 px-5 rounded shadow-testShadow scale-105 text-white text-xl"
                onClick={onClose}
            >
                <i className="ri-arrow-left-fill text-3xl text-white"></i>
            </button>
            <form onSubmit={handleSubmit} className="mt-4">
                <label className="block text-2xl font-inria-sans mb-1">Type of product:</label>
                <input
                    type="text"
                    name="Type"
                    value={type.Type}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-4 h-[45px] w-full font-inria-sans"
                />
                {errors.Type && <div className="text-red-500 mb-2">{errors.Type}</div>}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-Blue text-white text-xl px-4 py-2 rounded shadow-testShadow hover:scale-105"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddType;
