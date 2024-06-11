/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import SideButton from './component/sideButton';
import Login from './view/login';
import Home from './view/Homepage';
import Product from './view/listProduct';
import History from './view/History';
import Customer from './view/Customer';

// Layout component with SideButton
const LayoutWithSideButton = ({ children }) => (
  <>
    {children}
    <SideButton />
  </>
);

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<LayoutWithSideButton><Home /></LayoutWithSideButton>} />
      <Route path="/product" element={<LayoutWithSideButton><Product /></LayoutWithSideButton>} />
      <Route path="/history" element={<LayoutWithSideButton><History /></LayoutWithSideButton>} />
      <Route path="/customer" element={<LayoutWithSideButton><Customer /></LayoutWithSideButton>} />
    </Routes>
  </Router>,
  document.getElementById("root")
);
