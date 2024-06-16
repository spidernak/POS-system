/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SideButton from './component/sideButton';
import AdminButton from './component/Admin/sideButton';
import Login from './view/login';
import Home from './view/Homepage';
import Product from './view/listProduct';
import History from './view/History';
import Customer from './view/Customer';
import AddEmployee from './view/Admin/addemployee';
import EmployeeList from './view/Admin/Employee';
import { OrderProvider } from './component/Context/OrderContext';
import { EmployeeProvider } from './component/Context/EmployeeContext'; // Ensure the path is correct

const LayoutWithSideButton = ({ children }) => (
  <>
    {children}
    <SideButton />
  </>
);
const AdminSideButton = ({ children }) => (
  <>
    {children}
    <AdminButton/>
  </>
);
ReactDOM.render(
  <OrderProvider>
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<LayoutWithSideButton><Home /></LayoutWithSideButton>} />
          <Route path="/product" element={<LayoutWithSideButton><Product /></LayoutWithSideButton>} />
          <Route path="/history" element={<LayoutWithSideButton><History /></LayoutWithSideButton>} />
          <Route path="/customer" element={<LayoutWithSideButton><Customer /></LayoutWithSideButton>} />
          <Route path="/admin/addemy" element={<AdminSideButton><AddEmployee /></AdminSideButton>} />
          <Route path="/admin/employee" element={<AdminSideButton><EmployeeList /></AdminSideButton>} />
        </Routes>
      </Router>
    </EmployeeProvider>
  </OrderProvider>,
  document.getElementById('root')
);
