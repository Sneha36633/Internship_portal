import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* New SVG background with a professional theme */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="professionalPattern" width="150" height="150" patternUnits="userSpaceOnUse">
            {/* Envelope Icon */}
            <path d="M20 50 h60 v40 h-60 z" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M20 50 l30 20 l30 -20" stroke="white" strokeWidth="1.5" fill="none" />
            {/* Building Icon */}
            <path d="M100 110 h30 v-60 h-30 z" stroke="white" strokeWidth="1.5" fill="none" />
            <rect x="105" y="60" width="5" height="5" fill="white" />
            <rect x="115" y="60" width="5" height="5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#professionalPattern)" />
      </svg>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-gray-700 shadow-2xl">
        
        {/* Left Column: Contact Info */}
        <div className="flex-1 space-y-6 text-gray-300">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Get in Touch</h2>
          <p>Have questions or want to partner with us? We'd love to hear from you.</p>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
            <span>123 Career Avenue, New Delhi, India</span>
          </div>
          <div className="flex items-center gap-4">
            <FaPhone className="w-5 h-5 text-blue-400" />
            <span>(91) 987-654-3210</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="w-5 h-5 text-blue-400" />
            <span>contact@prismstate.com</span>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white text-center md:text-left">Send Us a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500 transition" />
            <input type="email" placeholder="Email Address" className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500 transition" />
            <textarea placeholder="Your Message" rows="4" className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-blue-500 focus:border-blue-500 transition"></textarea>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              type="submit" 
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Message
            </motion.button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;