import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserEdit } from "react-icons/fa";

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

  // Temporary string state for handling skills input smoothly
  const [skillsInput, setSkillsInput] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("❌ No token found in localStorage");
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
          console.log("❌ Profile fetch failed");
          setLoading(false);
          return;
        }

        const data = await response.json();

        const formattedData = {
          name: data.full_name || "",
          email: data.email || "",
          headline: data.bio || "Aspiring Developer",
          avatar: data.avatar || `https://api.dicebear.com/8.x/identicon/svg?seed=${data.full_name || "user"}`,
          education: data.education || "Not provided",
          skills: Array.isArray(data.skills) ? data.skills : [],
          resume: data.resume || "No Resume Uploaded",
        };

        setUserData(formattedData);
        setSkillsInput(formattedData.skills.join(", "));

      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ================= INPUT CHANGE =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= SAVE PROFILE =================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const processedSkills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);

      const response = await fetch(`${API_BASE}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: userData.name,
          bio: userData.headline,
          education: userData.education,
          skills: processedSkills,
        }),
      });

      if (!response.ok) {
        console.log("❌ Update failed");
        return;
      }

      const updated = await response.json();

      const updatedData = {
        name: updated.full_name || userData.name,
        email: updated.email || userData.email,
        headline: updated.bio || userData.headline,
        education: updated.education || userData.education,
        skills: Array.isArray(updated.skills) ? updated.skills : processedSkills,
        resume: updated.resume || userData.resume,
        avatar: updated.avatar || userData.avatar,
      };

      setUserData(updatedData);
      setSkillsInput(updatedData.skills.join(", "));
      setIsEditing(false);

    } catch (err) {
      console.error("❌ Save error:", err);
    }
  };

  // ================= LOADING & ERROR STATES =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-xl text-white">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 px-4 text-center">
        <p className="text-xl text-red-400 mb-4">Please log in to view your profile.</p>
        <p className="text-sm text-gray-500">No authorization token found or session expired.</p>
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-900 text-white container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CARD */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <img
              src={userData.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 objective-cover"
            />
            <h1 className="text-xl font-bold text-white">{userData.name || "User Name"}</h1>
            <p className="text-gray-400 text-sm mb-4">{userData.email}</p>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2 transition"
            >
              <FaUserEdit />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">

          {/* TABS */}
          <div className="flex border-b border-gray-700 mb-5">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "details" ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-white"
              }`}
            >
              Profile Details
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "applications" ? "text-blue-400 border-b-2 border-blue-500" : "text-gray-400 hover:text-white"
              }`}
            >
              Applications
            </button>
          </div>

          {/* DETAILS TAB */}
          {activeTab === "details" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                <input
                  name="name"
                  value={userData.name}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Bio / Headline</label>
                <input
                  name="headline"
                  value={userData.headline}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Education</label>
                <input
                  name="education"
                  value={userData.education}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Skills (Comma separated)</label>
                <input
                  value={skillsInput}
                  disabled={!isEditing}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. React, Node, Express"
                  className="w-full p-2.5 bg-gray-700 text-white rounded border border-gray-600 disabled:opacity-60"
                />
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded text-white font-medium transition"
                >
                  Save Changes
                </button>
              )}
            </motion.div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {applicationHistory.map((app) => (
                <div key={app.id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-semibold">{app.title}</h4>
                    <p className="text-gray-400 text-sm">{app.company}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded font-bold ${
                    app.status === "Interview Scheduled" ? "bg-green-900 text-green-300" :
                    app.status === "Under Review" ? "bg-yellow-900 text-yellow-300" : "bg-red-900 text-red-300"
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MyProfile;