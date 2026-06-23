import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import { apiConnector } from "../services/apiConnector";
import { auth } from "../services/apis";
``
interface FormData {
  fullName: string;
  email: string;
  password: string;
}   

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [showPwd, setShowPwd] = useState(false);

  const submitHandle: SubmitHandler<FormData> = async (data) => {
    try {
      console.log(data);
      const response = await apiConnector("POST", auth.SIGNUP_API, data);
      if (!response) {
        toast.error("No response from server");
      }

      console.log(response.data.data);
      toast.success("Account created successfully!");
        } catch (error) {
        console.log(error);
      toast.error("Something went wrong!");
    }finally{
        reset()
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>

              <h1 className="text-2xl font-bold mt-2">Create Account</h1>

              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submitHandle)} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>

                <input
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  type="text"
                  className="input outline-none input-bordered w-full pl-10"
                  placeholder="Daniel Dons"
                />
              </div>

              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="email"
                  className="input outline-none input-bordered w-full pl-10"
                  placeholder="daniel@example.com"
                />
              </div>

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>

                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type={showPwd ? "text" : "password"}
                  className="input outline-none input-bordered w-full pl-10 pr-10"
                  placeholder="******"
                />

                <button
                  type="button"
                  onClick={() => setShowPwd((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPwd ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
