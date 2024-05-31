import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './view/Homepage.jsx';
import Side from './component/sideButton.jsx'
import './index.css';
// import App from './App.jsx';

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
