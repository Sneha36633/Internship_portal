import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaGraduationCap,
  FaTools,
  FaFileUpload,
} from "react-icons/fa";

const applicationHistory = [
  { id: 1, title: "Frontend Developer Intern", company: "Vercel", status: "Under Review" },
  { id: 2, title: "Backend Developer Intern", company: "Stripe", status: "Interview Scheduled" },
  { id: 3, title: "UI/UX Design Intern", company: "Figma", status: "Not Selected" },
];

const API_BASE = "https://internship-portal-backend-4ju0.onrender.com";

const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE}/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("❌ Failed to load profile");
          setLoading(false);
          return;
        }

        const data = await response.json();

        setUserData({
          name: data.full_name || "",
          email: data.email || "",
          headline: data.bio || "Aspiring Developer",
          avatar:
            data.avatar ||
            `https://api.dicebear.com/8.x/identicon/svg?seed=${data.full_name || "user"}`,
          education: data.education || "Not provided",
          skills: Array.isArray(data.skills) ? data.skills : [],
          resume: data.resume || "No Resume Uploaded",
        });

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

      const response = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        console.error("❌ Failed to update profile");
        return;
      }

      const updated = await response.json();
      setUserData(updated);
      setIsEditing(false);

    } catch (err) {
      console.error("❌ Error saving profile:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-white mt-10">Loading profile...</p>;
  }

  if (!userData) {
    return <p className="text-center text-white mt-10">No profile data available</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
            <img
              src={userData.avatar}
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
            <p className="text-gray-400">{userData.email}</p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              <FaUserEdit className="inline mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">

            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              <button
                onClick={() => setActiveTab("details")}
                className={`py-2 px-4 ${activeTab === "details" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`}
              >
                Profile
              </button>

              <button
                onClick={() => setActiveTab("applications")}
                className={`py-2 px-4 ${activeTab === "applications" ? "text-white border-b-2 border-blue-500" : "text-gray-400"}`}
              >
                Applications
              </button>
            </div>

            {/* DETAILS */}
            {activeTab === "details" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <input
                  name="name"
                  value={userData.name}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
                />

                <input
                  name="headline"
                  value={userData.headline}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
                />

                <input
                  name="education"
                  value={userData.education}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
                />

                <input
                  value={(userData.skills || []).join(", ")}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      skills: e.target.value.split(","),
                    })
                  }
                  className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
                />

                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="bg-green-600 px-4 py-2 rounded text-white"
                  >
                    Save
                  </button>
                )}

              </motion.div>
            )}

            {/* APPLICATIONS */}
            {activeTab === "applications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {applicationHistory.map((app) => (
                  <div key={app.id} className="bg-gray-700 p-3 mb-2 rounded">
                    <h4 className="text-white">{app.title}</h4>
                    <p className="text-gray-400">{app.company}</p>
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