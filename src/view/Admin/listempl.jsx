import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8005/api/getuser");
      setUsers(response.data.User);
    } catch (err) {
      console.error("Something went wrong", err);
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8005/api/removeuser/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleEditClick = (user) => {
    setSelectedUserId(user.id);
    setSelectedUserName(user.name);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpdate = async () => {
    try {
      if (!imageFile) {
        setErrors({ image: 'Please select an image file.' });
        return;
      }
  
      const formData = new FormData();
      formData.append('image', imageFile);
  
      await axios.put(`http://localhost:8005/api/updateuserimage/${selectedUserId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      fetchData(); // Assuming fetchData() fetches updated user data
      cancelEdit();
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };
  

  const cancelEdit = () => {
    setIsEditing(false);
    setImageFile(null);
    setSelectedUserId(null);
    setSelectedUserName("");
    setErrors({});
  };

  const listHeaders = ["NO", "Name", "Email", "Gender", "Role", "Edit", "Delete"];

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-5 py-5 ">
        <div className="w-full flex gap-5 pb-5">
          <div className="flex items-center border w-[290px] text-black text-xl justify-center font-inria-sans py-2 px-2 rounded shadow-testShadow">
            <h1>Total Employees:</h1>
            <div className="font-bold">{users.length}</div>
          </div>
          <Link
            to="/admin/addemy"
            className="flex items-center justify-center cursor-pointer bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
          >
            <i className="ri-user-add-fill text-3xl text-white"></i>
          </Link>
        </div>
        <div className="w-full">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {listHeaders.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-white font-medium text-2xl font-inria-sans">{header}</span>
              </div>
            ))}
          </div>
          
        </div><div className="h-full shadow-testShadow scroll border border-t-none rounded-b-md">
            {users.map((user, id) => (
              <div
                key={user.id}
                className="w-full max-h-[80px]  py-5 flex border-b text-black font-medium text-2xl font-inria-sans"
              >
                <div className="flex-1 text-center">{id + 1}</div>
                <div className="flex-1 flex items-center text-center">
                  <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden mr-3">
                    {user.image ? (
                      <img
                        src={`http://localhost:8005/storage/${user.image}`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No photo</span>
                      </div>
                    )}
                  </div>
                  <div className="">{user.name}</div>
                </div>
                <div className="flex-1 text-center">{user.email}</div>
                <div className="flex-1 text-center">{user.gender}</div>
                <div className="flex-1 text-center">{user.role}</div>
                <div
                  className="flex-1 text-center cursor-pointer text-3xl text-[#4692DD]"
                  onClick={() => handleEditClick(user)}
                >
                  <i className="ri-ball-pen-line"></i>
                </div>
                <div
                  className="flex-1 text-center cursor-pointer text-3xl text-[#FF0B0B]"
                  onClick={() => handleDeleteClick(user.id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            ))}
          </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Change Profile Image for {selectedUserName}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 w-full border rounded"
              />
              {errors.image && <span className="text-red-500">{errors.image}</span>}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={cancelEdit}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImageUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
