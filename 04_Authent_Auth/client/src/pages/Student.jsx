import React from "react";

const Student = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 shadow-md">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome, Student 👋
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Courses Enrolled
            </h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Assignments Pending
            </h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">3</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Attendance
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-2">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;