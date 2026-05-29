// src/App.jsx

import React from "react";
import { Route, Routes } from "react-router-dom";

// Import Layout
import MainLayout from "./components/MainLayout.jsx";

// Import Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Internships from "./pages/Internships.jsx";
import InternshipDetail from "./pages/InternshipDetail.jsx"; // 1. IMPORT THE NEW PAGE
import MyProfile from "./pages/myprofile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="internships" element={<Internships />} />
          {/* 2. ADD THE DYNAMIC ROUTE FOR A SINGLE INTERNSHIP */}
          <Route path="internships/:id" element={<InternshipDetail />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default App;