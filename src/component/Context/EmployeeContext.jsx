import React, { createContext, useState, useContext } from "react";

const EmployeeContext = createContext();

export const useEmployeeContext = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: employees.length + 1,
    };
    setEmployees([...employees, newEmployee]);
  };

  const editEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === id ? { ...emp, ...updatedEmployee } : emp)));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};
