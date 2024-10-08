import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout'; 
import ProductList from './Component/ProductList';
import Home from './Component/Home';
import LoginForm from './Component/LoginForm';
import RegisterForm from './Component/RegisterForm';
import OtpForm from './Component/OtpForm';
import Cart from './Component/Cart'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="product" element={<ProductList />} /> 
          <Route path="login" element={<LoginForm />} /> 
          <Route path="register" element={<RegisterForm />} /> 
          <Route path="otp" element={<OtpForm />} /> 
          <Route path="cart" element={<Cart />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
