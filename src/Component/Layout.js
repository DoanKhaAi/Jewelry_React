import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Fragments/Header'; 
import Footer from './Fragments/Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
