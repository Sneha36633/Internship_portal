// src/pages/InternshipDetail.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaBuilding, FaArrowLeft } from 'react-icons/fa';

// We'll use the same mock data for now. In a real app, you'd fetch this by ID from an API.
const internshipData = [
  { id: 1, title: 'Frontend Developer Intern', company: 'Vercel', location: 'Remote', stipend: '₹25,000/mo', type: 'Full-time', skills: ['React', 'Next.js', 'TypeScript'], description: 'Join our team to build beautiful and performant user interfaces. You will work closely with our design and backend teams to create a seamless user experience.' },
  { id: 2, title: 'Backend Developer Intern', company: 'Stripe', location: 'Bangalore', stipend: '₹30,000/mo', type: 'Full-time', skills: ['Node.js', 'Go', 'SQL'], description: 'Work on the core infrastructure that powers Stripe. You will be responsible for designing, building, and maintaining our APIs and services.' },
  { id: 3, title: 'UI/UX Design Intern', company: 'Figma', location: 'Remote', stipend: '₹20,000/mo', type: 'Part-time', skills: ['Figma', 'UI Design', 'Prototyping'], description: 'Help us design the future of collaborative design tools. You will be involved in the entire design process, from user research to high-fidelity mockups.' },
  { id: 4, title: 'Data Science Intern', company: 'Google', location: 'Hyderabad', stipend: '₹40,000/mo', type: 'Full-time', skills: ['Python', 'TensorFlow', 'SQL'], description: 'Analyze large datasets to extract meaningful insights. You will work on projects that have a direct impact on our products and users.' },
  { id: 5, title: 'Product Management Intern', company: 'Atlassian', location: 'Bangalore', stipend: '₹28,000/mo', type: 'Full-time', skills: ['Jira', 'Agile', 'Roadmapping'], description: 'Define the product strategy and roadmap. You will work with cross-functional teams to bring new features to market.' },
];

const InternshipDetail = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const internship = internshipData.find(job => job.id === parseInt(id));

  // Handle case where internship is not found
  if (!internship) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">Internship Not Found</h1>
        <p className="text-gray-400 mt-2">The internship you are looking for does not exist.</p>
        <Link to="/internships" className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
          Back to Internships
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/internships" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mb-6">
        <FaArrowLeft />
        Back to All Internships
      </Link>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">{internship.title}</h1>
            <p className="flex items-center gap-2 text-lg text-gray-300 mt-2"><FaBuilding /> {internship.company}</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="w-full md:w-auto mt-4 md:mt-0 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </motion.button>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-gray-700 py-4 mb-6">
          <div className="text-gray-300"><FaMapMarkerAlt className="inline mr-2 text-blue-400"/>{internship.location}</div>
          <div className="text-gray-300"><FaMoneyBillWave className="inline mr-2 text-blue-400"/>{internship.stipend}</div>
          <div className="text-gray-300"><FaBriefcase className="inline mr-2 text-blue-400"/>{internship.type}</div>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert max-w-none text-gray-300">
          <h2 className="text-xl font-bold text-white">Job Description</h2>
          <p>{internship.description}</p>
          
          <h2 className="text-xl font-bold text-white mt-6">Required Skills</h2>
          <ul className="list-disc list-inside">
            {internship.skills.map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;