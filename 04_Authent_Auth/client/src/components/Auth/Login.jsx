import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AUTH_ENDPOINTS } from "../../services/apis";
import useAuth from "../../hooks/useAuth";
import { apiConnector } from "../../services/apiConnector";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setLoading, loading, setToken, setUser } = useAuth();

  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true);
    try {
      const response = await apiConnector(
        "POST",
        AUTH_ENDPOINTS.LOGIN_API,
        data
      );

      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.data);

      navigate("/");
      toast.success("LOGIN SUCCESSFULY");
       
    } catch (err) {
      console.log(err);
      toast.error("ERROR OCCURRED WHILE LOGIN ACCOUNT");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <h2 className="text-4xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-300 text-center mb-8">Login to continue</p>

        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none border border-white/20 focus:border-pink-400"
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
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
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

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
            <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>
          )}

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
            {loading ? "Signingg..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-300 hover:text-pink-200 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
