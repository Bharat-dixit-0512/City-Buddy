import React, { useState }from 'react';
import { NavLink, useNavigate, Navigate } from "react-router-dom";
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

  const { authUser, login } = userAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/user/login`, data);
      toast.success(response.data.message);
      login(response.data.user, response.data.token);
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

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] px-4">
      <div className="max-w-md w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E9ECEF] shadow-lg">
          <h1 className="text-[#212529] text-center text-3xl font-semibold">
            Sign In
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
            <div>
              <label className="text-[#212529] text-sm font-medium mb-2 block">Email ID<span className="text-red-500 font-bold text-lg">*</span></label>
              <input type="email" placeholder="Enter email" className="w-full bg-white text-[#212529] border border-[#E9ECEF] rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder:text-gray-400" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address" } })} />
              {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
            </div>
            <div>
              <label className="text-[#212529] text-sm font-medium mb-2 block">Password<span className="text-red-500 font-bold text-lg">*</span></label>
              <div className="relative flex items-center">
                <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-full bg-white text-[#212529] border border-[#E9ECEF] rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#0077B6] placeholder:text-gray-400" {...register("password", { required: "Password is required" })} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-[#495057] hover:text-[#212529] cursor-pointer">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              {errors.password && (<p className="text-red-500 text-sm mt-1">{errors.password.message}</p>)}
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 px-4 text-base font-semibold tracking-wide rounded-lg text-white bg-[#FF7B54] hover:bg-[#E85D04] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(255,123,84,0.4)] hover:shadow-[0_0_15px_rgba(232,93,4,0.6)] transition-all duration-300">
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="text-[#495057] text-sm !mt-6 text-center">
              Don’t have an account?{" "}
              <NavLink to="/signup" className="text-[#00B4D8] hover:underline ml-1 font-semibold">Register here</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;