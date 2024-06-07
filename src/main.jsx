// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Homepage.jsx';
import './index.css';
import Login from './view/login.jsx';
// import App from './App.jsx';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Router>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/" element={<Login />} />
      <Route path='/home' element={<Home/>} />
      
    </Routes>
  </Router>,
  document.getElementById("root")
);
