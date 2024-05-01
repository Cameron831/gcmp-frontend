import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';  // Import Outlet from react-router-dom

const Layout = () => (
  <div>
    <Header />
    <div style={{ margin: '20px' }}>
      <Outlet /> 
    </div>
  </div>
);

export default Layout;
