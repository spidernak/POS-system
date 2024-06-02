// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Homepage.jsx';
import Side from './component/sideButton.jsx'
import './index.css';
// import App from './App.jsx';

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <Router>
    <Routes>
      {/* <Route path="/" element={<App />} /> */}
      <Route path="/" element={<Home />} />
      <Route path='/home' element={<Side/>} />
      
    </Routes>
  </Router>,
  document.getElementById("root")
);
