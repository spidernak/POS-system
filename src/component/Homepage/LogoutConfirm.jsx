import React from "react";

const LogoutConfirm = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-md shadow-md text-center">
        <p className="text-lg font-semibold mb-3">Are you sure you want to logout?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;
