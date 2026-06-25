import React from "react";
import useAuth from "../hooks/useAuth";

const Admin = () => {
  const {user} = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome, Admin 👋
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-4xl font-bold text-indigo-600 mt-2">150</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-lg font-semibold">Name: {user?.name}</p>
            <p className="text-gray-600">Email: {user?.email}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Active Users
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-2">120</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">$5,200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
