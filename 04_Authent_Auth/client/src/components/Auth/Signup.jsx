import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { AUTH_ENDPOINTS } from "../../services/apis";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const { setLoading, loading } = useAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        AUTH_ENDPOINTS.SIGNUP_API,
        data,
      );
      console.log(response);
      toast.success("Account Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error("ERROR OCCURRED WHILE CREATING ACCOUNT")
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-4xl font-bold text-white text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-300 text-center mb-8">Join us today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
            />
            {errors.name && (
              <p className="text-red-400 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
            />
            {errors.email && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
            />
            {errors.password && (
              <p className="text-red-400 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-white mb-2">Role</label>
            <select
              {...register("role", {
                required: "Please select a role",
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white outline-none border border-white/20 focus:border-pink-400"
            >
              <option value="" className="text-black">
                Select Role
              </option>
              <option value="user" className="text-black">
                User
              </option>
              <option value="admin" className="text-black">
                Admin
              </option>
            </select>

            {errors.role && (
              <p className="text-red-400 mt-1 text-sm">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-white ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-300 hover:text-pink-200 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
