import { Link } from "react-router-dom";
import { useEmployeeContext } from "../../component/Context/EmployeeContext";
import { useState } from "react";

const EmployeeList = () => {
  const { employees = [], editEmployee, deleteEmployee } = useEmployeeContext();
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    role: "",
    sex: "",
    password: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      name: employee.name,
      dob: employee.dob,
      role: employee.role,
      sex: employee.sex,
      password: "", // Assuming password is not editable in this form
    });
    setPhotoPreview(employee.photo); // Set current employee's photo as preview
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    deleteEmployee(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      handlePhotoPreview(file);
    }
  };

  const handlePhotoPreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = { ...formData };
    if (photoPreview) {
      employeeData.photo = photoPreview;
    }

    editEmployee(currentEmployee.id, employeeData);
    setIsEditing(false);
    setCurrentEmployee(null);
    setFormData({
      name: "",
      dob: "",
      role: "",
      sex: "",
      password: "",
    });
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const listHeaders = ["Name","ID",  "Gender", "Position", "Edit", "Delete"];

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5 gap-10">
        <div className="w-full flex gap-10">
          <div className="flex border w-[290px] text-black text-xl justify-center font-inria-sans py-2 px-2 rounded shadow-testShadow">
            <h1>Total Employees:</h1>
            <div className="font-bold">{employees.length}</div>
          </div>
          <Link to='/admin/addemy' className="flex items-center justify-center cursor-pointer bg-Blue w-[80px] text-white text-xl">
            <i className="ri-user-add-fill"></i>
          </Link>
        </div>
        <div className="w-full h-full flex-col  flex  ">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {listHeaders.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-black font-medium text-2xl font-inria-sans">{header}</span>
              </div>
            ))}
          </div>
          <div className="h-full  overflow-y-auto  border border-t-none rounded-b-md">
            {employees.map((employee) => (
              <div key={employee.id} className="w-full max-h-[80px] px-5 py-5 flex border-b text-black font-medium text-2xl font-inria-sans">
                <div className="flex-1 flex items-center  text-center">
                  <div className="w-[70px] h-[70px] rounded-[10px] overflow-hidden mr-3">
                    {employee.photo ? (
                      <img src={employee.photo} alt={employee.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No photo</span>
                      </div>
                    )}
                  </div>
                  <div className="">{employee.name}</div>
                </div><div className="flex-1 text-center ">{employee.id}</div>
                
                <div className="flex-1 text-center">{employee.sex}</div>
                <div className="flex-1 text-center">{employee.role}</div>
                <div className="flex-1 text-center cursor-pointer text-3xl  text-[#4692DD]" onClick={() => handleEditClick(employee)}>
                  <i className="ri-ball-pen-line"></i>
                </div>
                <div className="flex-1 text-center cursor-pointer text-3xl text-[#FF0B0B]" onClick={() => handleDeleteClick(employee.id)}>
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700">Role:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label className="block text-gray-700">Gender:</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="sex"
                      value="male"
                      checked={formData.sex === "male"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="female"
                      checked={formData.sex === "female"}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700">Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
