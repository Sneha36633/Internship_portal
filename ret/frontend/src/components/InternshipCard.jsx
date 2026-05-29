// src/components/InternshipCard.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase } from 'react-icons/fa';

// 2. Add 'id' to the props
const InternshipCard = ({ id, title, company, location, stipend, type, skills }) => {
  return (
    // 3. Wrap the entire card in a Link component
    <Link to={`/internships/${id}`} className="block">
      <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-blue-500/20">
        <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
        <p className="text-lg text-gray-300 mt-1">{company}</p>

        <div className="mt-4 space-y-2 text-gray-400">
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> {location}</p>
          <p className="flex items-center gap-2"><FaMoneyBillWave /> {stipend}</p>
          <p className="flex items-center gap-2"><FaBriefcase /> {type}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
        
        {/* You can optionally keep the button for styling, but the whole card is now a link */}
        <div className="w-full mt-6 text-center px-4 py-2 bg-blue-600 rounded-lg text-white font-bold">
          View Details
        </div>
      </div>
    </Link>
  );
};

export default InternshipCard;