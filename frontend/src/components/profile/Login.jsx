import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuth } from "../../context/AuthProvider";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = userAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/user/login`, data);
      toast.success(response.data.message);
      // store via context
      login(response.data.user, response.data.token);
      if (response.data.usingFallback) {
        toast("Server using local fallback storage (development)");
      }
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Try again!");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <div className="max-w-md w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-gray-900/50 border border-yellow-500/30 shadow-lg shadow-yellow-500/10">
          <h1 className="text-yellow-400 text-center text-3xl font-semibold [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
            {/* Email */}
            <div>
              <label className="text-yellow-400 text-sm font-medium mb-2 block">
                Email ID<span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-yellow-400 text-sm font-medium mb-2 block">
                Password
                <span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-yellow-400/70 hover:text-yellow-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 text-base font-semibold tracking-wide rounded-lg text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <p className="text-yellow-200/80 text-sm !mt-6 text-center">
              Don’t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-yellow-300 hover:underline ml-1 font-semibold"
              >
                Register here
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;