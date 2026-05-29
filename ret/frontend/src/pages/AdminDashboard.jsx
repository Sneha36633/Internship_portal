import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Services Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <button className="w-full py-2 mb-3 bg-green-600 hover:bg-green-700 rounded-md text-white">
            ➕ Add Service
          </button>
        </div>

        {/* Bookings Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          <button className="w-full py-2 mb-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            ✅ Approve Booking
          </button>
          <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-md text-white">
            ❌ Reject Booking
          </button>
        </div>

        {/* Workouts Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Workout Plans</h2>
          <button className="w-full py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-white">
            ➕ Add Workout Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
