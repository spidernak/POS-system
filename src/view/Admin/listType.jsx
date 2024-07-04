import React, { useEffect, useState } from "react";
import axios from "axios";
import AddType from "./addtype";
import EditType from "./Edittype";
import "../../App.css";

const ListType = ({ onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);
  const [showEditTypeModal, setShowEditTypeModal] = useState(false);
  const [type, setType] = useState([]);
  const [currentType, setCurrentType] = useState(null);
  const [typeIdToDelete, setTypeIdToDelete] = useState(null);
  const listHeaders = ["No", "Name", "Edit", "Remove"];

  useEffect(() => {
    fetchTypeData();
  }, []);

  const fetchTypeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8005/api/viewtypeofpro"
      );
      setType(response.data.Type);
    } catch (err) {
      console.error("Error fetching type data:", err);
    }
  };

  const handleUpdate = (type) => {
    setCurrentType(type);
    setShowEditTypeModal(true);
  };

  const handleDeleteClick = (typeId) => {
    setTypeIdToDelete(typeId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8005/api/removetypeofpro/${typeIdToDelete}`
      );

      if (response.status === 200) {
        console.log(response.data.message);
        fetchTypeData();
        setShowModal(false);
      } else {
        window.alert(response.data.err);
        console.error("Error deleting this type: ", response.data.error);
      }
    } catch (err) {
      if (err.response) {
        window.alert(err.response.data.message || "Something went wrong");
        console.error("Error deleting type:", err.response.data.message || err);
      } else {
        window.alert("An error occurred while trying to remove the type.");
        console.error("Error deleting type:", err);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5 gap-5">
        <div className="w-full flex gap-5">
          <div
            onClick={onClose}
            className="flex items-center justify-center cursor-pointer hover:scale-105 bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
          >
            <i className="ri-arrow-left-fill text-3xl text-white"></i>
          </div>
          <div className="flex bg-Blue border text-white items-center shadow-testShadow hover:scale-105 text-2xl justify-center font-inria-sans py-2 px-2 rounded ">
            <h1>List Type</h1>
          </div>
          <div className="relative group">
            <div
              onClick={() => setShowAddTypeModal(true)}
              className="flex items-center justify-center cursor-pointer hover:scale-105 bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
            >
              <i className="ri-add-line text-3xl text-white"></i>
            </div>
            <div className="absolute -top-0 left-[90px] w-[100px] transform opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-sm rounded p-1">
              Add New Type
            </div>
          </div>
        </div>
        <div className="w-full h-full flex-col flex">
          <div className="w-full flex bg-Blue py-5 rounded-t shadow-testShadow">
            {listHeaders.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-white font-medium text-2xl font-inria-sans">
                  {header}
                </span>
              </div>
            ))}
          </div>
          <div className="h-full shadow-testShadow overflow-y-auto border border-t-none rounded-b-md">
            {type.map((type, i) => (
              <div
                key={type.id}
                className="w-full max-h-[80px] py-5 flex border-b text-black font-medium text-2xl font-inria-sans"
              >
                <div className="flex-1 text-center">
                  {i + 1}
                </div>
                <div className="flex-1 text-center">{type.Type}</div>
                <div
                  className="flex-1 text-center cursor-pointer text-3xl text-[#4692DD]"
                  onClick={() => handleUpdate(type)}
                >
                  <i className="ri-ball-pen-line"></i>
                </div>
                <div
                  className="flex-1 text-center cursor-pointer text-3xl text-[#FF0B0B]"
                  onClick={() => handleDeleteClick(type.id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this type?</p>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg">
            <AddType
              onClose={() => {
                setShowAddTypeModal(false);
                fetchTypeData(); // Refresh the list
              }}
            />
          </div>
        </div>
      )}
      {showEditTypeModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg">
            <EditType
              type={currentType}
              onClose={() => {
                setShowEditTypeModal(false);
                fetchTypeData(); // Refresh the list
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListType;
