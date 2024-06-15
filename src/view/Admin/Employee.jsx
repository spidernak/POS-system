import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { EmployeeContext } from '../../component/Context/EmployeeContext';

const EmployeeList = () => {
  const { employees, addEmployee } = useContext(EmployeeContext);

  const list = ['ID', 'Name', 'Gender', 'Position', 'Edit', 'Delete'];

  const editEmployee = (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      const updatedEmployees = employees.map(employee => {
        if (employee.id === id) {
          return { ...employee, name: newName };
        }
        return employee;
      });
      // Update employees context with the new name
      addEmployee(updatedEmployees);
    }
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updatedEmployees = employees.filter(employee => employee.id !== id);
      // Update employees context after deleting the employee
      addEmployee(updatedEmployees);
    }
  };

  return (
    <div className="w-screen h-screen flex absolute bg-homeBg">
      <div className="w-full flex flex-col ml-[140px] px-10 pl-5 py-5 gap-10">
        <div className="w-full flex gap-10">
          <div className="flex border w-[290px] text-black text-xl justify-center font-inria-sans py-2 px-2 rounded shadow-testShadow">
            <h1>Total Employee:</h1>
            <div className="font-bold">{employees.length}</div>
          </div>
          <Link to='/admin/addemy' className="flex items-center justify-center cursor-pointer bg-Blue w-[80px] text-white text-xl">
            <i className="ri-user-add-fill"></i>
          </Link>
        </div>
        <div className="w-full h-full flex-col py-5 px-5 flex bg-white shadow-testShadow rounded border">
          <div className="w-full flex bg-Blue py-5 rounded shadow-testShadow">
            {list.map((header, index) => (
              <div key={index} className="flex-1 text-center">
                <span className="text-black font-medium text-2xl font-inria-sans">{header}</span>
              </div>
            ))}
          </div>
          <div className='h-full scroll bg-white shadow-testShadow border border-t-none rounded-b-md'>
            {employees.map((employee) => (
              <div key={employee.id} className="w-full px-5 py-5 flex border-b">
                <div className="flex-1 text-center">{employee.id}</div>
                <div className="flex-1 text-center">{employee.name}</div>
                <div className="flex-1 text-center">{employee.sex}</div>
                <div className="flex-1 text-center">{employee.role}</div>
                <div className="flex-1 text-center">
                  <i
                    className="ri-ball-pen-line cursor-pointer"
                    onClick={() => editEmployee(employee.id)}
                  ></i>
                </div>
                <div className="flex-1 text-center">
                  <i
                    className="ri-delete-bin-line cursor-pointer"
                    onClick={() => deleteEmployee(employee.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
