import { Link } from "react-router-dom";
import { useEmployeeContext } from "../../component/Context/EmployeeContext";
import { useState, useEffect } from "react";
import '../../App.css'

const AddEmployee = () => {
  const { addEmployee, editEmployee } = useEmployeeContext();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    role: "Cashier",
    sex: "",
    password: "",
  });
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [errors, setErrors] = useState({});
  const [, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (currentEmployee) {
      setFormData({
        name: currentEmployee.name,
        dob: currentEmployee.dob,
        role: currentEmployee.role,
        sex: currentEmployee.sex,
        password: currentEmployee.password, // Display the current password
      });
      setPhotoPreview(currentEmployee.photo); // Set current employee's photo as preview
    } else {
      setFormData({
        name: "",
        dob: "",
        role: "Cashier",
        sex: "",
        password: "",
      });
      setPhotoPreview(null);
    }
  }, [currentEmployee]);

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
    
    if (!formData.name || !formData.dob || !formData.password || !formData.sex || !formData.role) {
      setErrors({
        name: !formData.name ? "Name is required" : "",
        dob: !formData.dob ? "Date of Birth is required" : "",
        password: !formData.password ? "Password is required" : "",
        sex: !formData.sex ? "Gender is required" : "",
      });
      return;
    }

    const employeeData = { ...formData, photo: photoPreview };

    if (currentEmployee) {
      editEmployee(currentEmployee.id, employeeData);
    } else {
      addEmployee(employeeData);
    }

    setFormData({
      name: "",
      dob: "",
      role: "Cashier",
      sex: "",
      password: "",
    });
    setPhotoFile(null);
    setPhotoPreview(null);
    setCurrentEmployee(null); // Reset currentEmployee after submission
    setErrors({}); // Clear errors after successful submission
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5 gap-5">
        <div className="w-full flex gap-5 items-center">
          <Link
            to="/admin/employee"
            className="flex items-center justify-center cursor-pointer hover:scale-105 bg-Blue w-[80px] h-[60px] rounded shadow-testShadow border border-gray-300"
          >
            <i className="ri-arrow-left-fill text-3xl text-white"></i>
          </Link>

          <h1 className="text-black text-3xl font-bold font-text">
            {currentEmployee ? "Edit Employee" : "Add Employee"}
          </h1>
        </div>
        <div className="w-full h-full flex-col py-5 px-10 flex bg-white shadow-testShadow rounded border">
          
          <form onSubmit={handleSubmit} className="w-full justify-center items-center flex gap-10">
            <div className="w-[300px] h-[340px]  border rounded shadow-testShadow cursor-pointer hover:bg-gray-200 ">
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
                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.dob ? 'border-red-500' : ''}`}
                />
                {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="Cashier">Cashier</option>
                  <option value="Admin">Admin</option>
                  <option value="Stuff">Stuff</option>
                </select>
              </div>
              <div className="mb-4">
                <span className="block text-gray-700 text-sm font-bold mb-2">Gender:</span>
                <div className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    name="sex"
                    value="male"
                    checked={formData.sex === "male"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Male</span>
                </div>
                <div className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="female"
                    checked={formData.sex === "female"}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </div>
                {errors.sex && <p className="text-red-500 text-xs italic">{errors.sex}</p>}
              </div>
              {!currentEmployee && (
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
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {currentEmployee ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
