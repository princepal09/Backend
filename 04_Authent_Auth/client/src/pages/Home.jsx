import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">

      {/* Background circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-30"></div>

     

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[80vh]">

        <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight">
          Build.
          <span className="block text-pink-300">
            Connect.
          </span>
          Grow.
        </h1>

        <p className="mt-8 max-w-2xl text-lg md:text-xl text-gray-200">
          Discover a platform designed to help you connect, collaborate,
          and grow your ideas faster than ever before.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <Link
            to="/login"
            className="px-10 py-4 bg-white text-purple-700 rounded-xl text-lg font-semibold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-10 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white hover:text-purple-700 transition duration-300"
          >
            Create Account
          </Link>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-3 gap-8 bg-white/10 backdrop-blur-md rounded-3xl p-8">
          <div>
            <h2 className="text-3xl font-bold text-white">10K+</h2>
            <p className="text-gray-300">Users</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">500+</h2>
            <p className="text-gray-300">Projects</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">99%</h2>
            <p className="text-gray-300">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}   