import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const API = import.meta.env.VITE_API_URL || "http://localhost:4001";
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/user/login`, data);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/"); 
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        toast.error("Something went wrong. Try again!");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-[480px] w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black shadow-sm">
          <NavLink to="/">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign in</h1>
          </NavLink>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
            {/* Email */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Email id<span className="text-red-600 font-bold text-lg">*</span></label>
              <input type="email" placeholder="Enter email" className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                {...register("email", { required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">Password<span className="text-red-600 font-bold text-lg">*</span></label>
              <div className="relative flex items-center">
                <input type={showPassword ? "text" : "password"} placeholder="Enter password"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-10 rounded-md outline-blue-600"
                  {...register("password", { required: "Password is required" })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-slate-500 hover:text-slate-700 cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer">
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-slate-900 text-sm !mt-6 text-center">
              Don’t have an account? <NavLink to="/signup" className="text-indigo-600 hover:underline ml-1 font-semibold">Register here</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
