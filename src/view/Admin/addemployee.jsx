import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { EmployeeContext } from '../../component/Context/EmployeeContext';

const AddEmployee = () => {
  const { addEmployee, employees } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    role: "Cashier",
    sex: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData({
        ...formData,
        sex: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee(formData);
    console.log("Form Data Submitted:", formData);
    setFormData({
      name: "",
      dob: "",
      role: "Cashier",
      sex: "",
      password: "",
    });
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5 gap-10">
        <div className="w-full flex">
          <Link to='/admin/stuff' className="flex items-center justify-center cursor-pointer bg-Blue w-[80px] text-white text-xl">
            <i className="ri-arrow-left-fill"></i>
          </Link>
          <div className="flex border w-[290px] text-black text-xl justify-center font-inria-sans py-2 px-2 rounded shadow-testShadow">
            <h1>Total Employee:</h1>
            <div className="font-bold">{employees.length}</div>
          </div>
        </div>
        <div className="w-full h-full flex-col py-5 px-10 flex bg-white shadow-testShadow rounded border">
          <h1 className="text-black text-3xl font-bold font-text pb-10">Add Employee</h1>
          <form onSubmit={handleSubmit} className="w-full justify-center flex gap-10">
            <div className="w-[300px] h-[340px] bg-black"></div>
            <div className="p-6 w-full max-w-lg rounded-lg">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth:</label>
                <input
                  type="text"
                  name="dob"
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
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
                  <option value="Stock">Stock</option>
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
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
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
