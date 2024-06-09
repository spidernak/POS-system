/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Login from './view/login';
import App from './App.jsx';
import Home from './view/Homepage';
import Product from './view/Product';
import SideButton from './component/sideButton'; 
import History from './view/History.jsx';
import Customer from './view/Customer.jsx';

const HideOnLogin = ({ children }) => {
  const location = useLocation();
  // Hide the component if the current route is '/'
  if (location.pathname === '/') {
    return null;
  }
  return children;
};

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HideOnLogin><App /></HideOnLogin>}>
        <Route index element={<Home />} />
      </Route>
      
      <Route path="/product" element={<Product />} />
        <Route path="/history" element={<History />} />
        <Route path="/customer" element={<Customer/>} />
    </Routes>
    <SideButton /> {/* Always render SideButton component */}
  </Router>,
  document.getElementById("root")
);
