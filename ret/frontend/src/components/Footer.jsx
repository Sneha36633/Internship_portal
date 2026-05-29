// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 text-gray-400 mt-16">
      <div className="container mx-auto py-8 px-4 text-center">
        <p className="font-bold text-lg text-white">Prism State</p>
        <p className="text-sm mt-2">Your Partner in Career Development.</p>
        <div className="mt-4">
          
          <Link to="/contact" className="px-2 hover:text-white">Contact</Link>|
          <Link to="/internships" className="px-2 hover:text-white">Internships</Link>
        </div>
        <p className="text-xs mt-6">&copy; {new Date().getFullYear()} Prism State. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;