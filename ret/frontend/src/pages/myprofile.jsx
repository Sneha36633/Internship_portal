import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaGraduationCap,
  FaTools,
  FaFileUpload,
} from "react-icons/fa";

// Mock application data (keeping as-is for now)
const applicationHistory = [
  { id: 1, title: "Frontend Developer Intern", company: "Vercel", status: "Under Review" },
  { id: 2, title: "Backend Developer Intern", company: "Stripe", status: "Interview Scheduled" },
  { id: 3, title: "UI/UX Design Intern", company: "Figma", status: "Not Selected" },
];

const MyProfile = () => {
  const [userData, setUserData] = useState(null); // Initially null
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("https://internship-portal-backend-4ju0.onrender.com/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // send token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            name: data.full_name,
            email: data.email,
            headline: data.bio || "Aspiring Developer",
            avatar: data.avatar || "https://api.dicebear.com/8.x/identicon/svg?seed=User"+data.full_name,
            education: data.education || "Not provided",
            skills: Array.isArray(data.skills) ? data.skills : [],
            resume: data.resume || "No Resume Uploaded",
          });
        } else {
          console.error("❌ Failed to load profile");
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://internship-portal-backend-4ju0.onrender.com/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updated = await response.json();
        setUserData(updated);
        console.log("✅ Profile updated:", updated);
      } else {
        console.error("❌ Failed to update profile");
      }
    } catch (err) {
      console.error("❌ Error saving profile:", err);
    }

    setIsEditing(false);
  };

  // Show loading
  if (loading) {
    return <p className="text-center text-white mt-10">Loading profile...</p>;
  }

  // If no user data (not logged in)
  if (!userData) {
    return <p className="text-center text-white mt-10">No profile data available</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column: Profile Card --- */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <img
              src={userData.avatar}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400">{userData.email}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              <FaUserEdit />
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* --- Right Column: Tabs and Content --- */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-2 px-4 font-semibold transition-colors ${
                  activeTab === "details"
                    ? "border-b-2 border-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`py-2 px-4 font-semibold transition-colors ${
                  activeTab === "applications"
                    ? "border-b-2 border-blue-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Application History
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 w-full bg-gray-700 rounded-md p-2 border border-gray-600 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Headline</label>
                  <input
                    type="text"
                    name="headline"
                    value={userData.headline}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 w-full bg-gray-700 rounded-md p-2 border border-gray-600 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    <FaGraduationCap className="inline mr-2" />
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={userData.education}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="mt-1 w-full bg-gray-700 rounded-md p-2 border border-gray-600 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    <FaTools className="inline mr-2" />
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={userData.skills.join(", ")}
                    onChange={(e) =>
                      setUserData({ ...userData, skills: e.target.value.split(", ") })
                    }
                    disabled={!isEditing}
                    className="mt-1 w-full bg-gray-700 rounded-md p-2 border border-gray-600 text-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Resume/CV</label>
                  <div className="mt-1 flex items-center justify-between bg-gray-700 rounded-md p-2 border border-gray-600">
                    <span className="text-gray-300">{userData.resume}</span>
                    <button
                      disabled={!isEditing}
                      className="text-sm font-semibold text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaFileUpload className="inline mr-1" /> Change
                    </button>
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                )}
              </motion.div>
            )}

            {activeTab === "applications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {applicationHistory.map((app) => (
                  <div
                    key={app.id}
                    className="bg-gray-700 p-4 rounded-lg flex justify-between items-center border border-gray-600"
                  >
                    <div>
                      <h4 className="font-bold text-white">{app.title}</h4>
                      <p className="text-sm text-gray-400">{app.company}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        app.status === "Under Review"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : app.status === "Interview Scheduled"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
