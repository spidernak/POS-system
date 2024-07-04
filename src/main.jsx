/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import SideButton from "./component/sideButton";
import AdminButton from "./component/Admin/sideButton";
import Login from "./view/login";
import Home from "./view/Homepage";
import Product from "./view/listProduct";
import History from "./view/History";
import Customer from "./view/Customer";
import AddEmployee from "./view/Admin/adduser";
import { OrderProvider } from "./component/Context/OrderContext";
import { EmployeeProvider } from "./component/Context/EmployeeContext"; // Ensure the path is correct
import Dashboard from "./view/Admin/Dashboard";
import Test from "./view/TestingAPi";
import Adminproduct from "./view/Admin/Product";
import Addproduct from "./view/Admin/Addproduct";
import ListEmployee from "./view/Admin/listempl";
import Addtype from "./view/Admin/addtype";
import AdminHistory from "./view/Admin/History";
import ListCustomer from "./view/Admin/listcustomer";
import ProtectedRoute from "./ProtectRoute";
import Unauthorized from "./unautorize";

const LayoutWithSideButton = ({ children }) => (
  <>
    {children}
    <SideButton />
  </>
);
const AdminSideButton = ({ children }) => (
  <>
    {children}
    <AdminButton />
  </>
);
ReactDOM.render(
  <OrderProvider>
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <LayoutWithSideButton>
                <Home />
              </LayoutWithSideButton>
            }
          />
          <Route
            path="/product"
            element={
              <LayoutWithSideButton>
                <Product />
              </LayoutWithSideButton>
            }
          />
          <Route
            path="/history"
            element={
              <LayoutWithSideButton>
                <History />
              </LayoutWithSideButton>
            }
          />
          <Route
            path="/customer"
            element={
              <LayoutWithSideButton>
                <Customer />
              </LayoutWithSideButton>
            }
          />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/admin"
              element={
                <AdminSideButton>
                  <Dashboard />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/addemy"
              element={
                <AdminSideButton>
                  <AddEmployee />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/employee"
              element={
                <AdminSideButton>
                  <ListEmployee />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/addproduct"
              element={
                <AdminSideButton>
                  <Addproduct />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/product"
              element={
                <AdminSideButton>
                  <Adminproduct />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/addtype"
              element={
                <AdminSideButton>
                  <Addtype />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/customer"
              element={
                <AdminSideButton>
                  <ListCustomer />
                </AdminSideButton>
              }
            />
            <Route
              path="/admin/history"
              element={
                <AdminSideButton>
                  <AdminHistory />
                </AdminSideButton>
              }
            />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/testapi" element={<Test />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  </OrderProvider>,
  document.getElementById("root")
);
