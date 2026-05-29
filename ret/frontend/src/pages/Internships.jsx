import React, { useState, useMemo } from 'react';
import InternshipCard from '../components/InternshipCard'; // Import the new component

// Mock data - in a real app, this would come from an API
const internshipData = [
  { id: 1, title: 'Frontend Developer Intern', company: 'Vercel', location: 'Remote', stipend: '₹25,000/mo', type: 'Full-time', skills: ['React', 'Next.js', 'TypeScript'] },
  { id: 2, title: 'Backend Developer Intern', company: 'Stripe', location: 'Bangalore', stipend: '₹30,000/mo', type: 'Full-time', skills: ['Node.js', 'Go', 'SQL'] },
  { id: 3, title: 'UI/UX Design Intern', company: 'Figma', location: 'Remote', stipend: '₹20,000/mo', type: 'Part-time', skills: ['Figma', 'UI Design', 'Prototyping'] },
  { id: 4, title: 'Data Science Intern', company: 'Google', location: 'Hyderabad', stipend: '₹40,000/mo', type: 'Full-time', skills: ['Python', 'TensorFlow', 'SQL'] },
  { id: 5, title: 'Product Management Intern', company: 'Atlassian', location: 'Bangalore', stipend: '₹28,000/mo', type: 'Full-time', skills: ['Jira', 'Agile', 'Roadmapping'] },
];

const Internships = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the data based on the search term
  const filteredInternships = useMemo(() => {
    if (!searchTerm) return internshipData;
    return internshipData.filter(internship =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Find Your Next Opportunity</h1>
        <p className="text-gray-400 mt-2">Search our open positions below.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search by title, company, or skill (e.g., 'React')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Internships Grid */}
      {filteredInternships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInternships.map(internship => (
            <InternshipCard key={internship.id} {...internship} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-12">No internships found matching your search.</p>
      )}
    </div>
  );
};

export default Internships;