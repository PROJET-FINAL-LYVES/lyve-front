import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import HomeComponent from '../Home/HomeComponent';
import LoginComponent from '../Login/LoginComponent';

import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
  </Router>
);

export default App;
