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
import AddEmployee from './view/addemployee';
import { OrderProvider } from './component/Context/OrderContext'; // Ensure the path is correct

const LayoutWithSideButton = ({ children }) => (
  <>
    {children}
    <SideButton />
  </>
);

ReactDOM.render(
  <OrderProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<LayoutWithSideButton><Home /></LayoutWithSideButton>} />
        <Route path="/product" element={<LayoutWithSideButton><Product /></LayoutWithSideButton>} />
        <Route path="/history" element={<LayoutWithSideButton><History /></LayoutWithSideButton>} />
        <Route path="/customer" element={<LayoutWithSideButton><Customer /></LayoutWithSideButton>} />
        <Route path="/admin/addemy" element={<LayoutWithSideButton><AddEmployee /></LayoutWithSideButton>} />
      </Routes>
    </Router>
  </OrderProvider>,
  document.getElementById('root')
);
