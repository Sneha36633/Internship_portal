// src/components/MainLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24"> {/* Padding to prevent content from hiding behind navbar */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;