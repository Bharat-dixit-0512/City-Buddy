import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      if (data.adminCode) payload.role = "admin" , payload.adminCode = data.adminCode;

  const response = await axios.post(`${API_BASE}/user/signup`, payload);

  alert(response.data.message + (response.data.usingFallback ? " (stored in local fallback)" : ""));
      reset();
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // show server-provided message and any detailed error if present
        const serverMsg = error.response.data?.message || "Signup failed";
        const serverDetail = error.response.data?.error;
        alert(serverMsg + (serverDetail ? "\nDetails: " + serverDetail : ""));
      } else {
        alert("Something went wrong. Try again!");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-2xl shadow border sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl">Create an account</h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Username<span className="text-red-600 font-bold text-lg">*</span></label>
              <input type="text" placeholder="Enter your username"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">Username is required (min 3 characters)</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Your email<span className="text-red-600 font-bold text-lg">*</span></label>
              <input type="email" placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                {...register("email", { required: "Email is required", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message || "Enter valid email"}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Password<span className="text-red-600 font-bold text-lg">*</span></label>
              <div className="relative flex items-center">
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pr-10"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-500 hover:text-gray-700">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Confirm password<span className="text-red-600 font-bold text-lg">*</span></label>
              <div className="relative flex items-center">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pr-10"
                  {...register("confirmPassword", { required: true, validate: (value) => value === password || "Passwords do not match" })}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 text-gray-500 hover:text-gray-700">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded cursor-pointer" {...register("terms", { required: true })} />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                I accept the <button type="button" className="text-indigo-600 hover:underline cursor-pointer" onClick={() => setShowModal(true)}>Terms and Conditions</button>
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mt-1">You must accept the terms</p>}

            <button type="submit" disabled={loading} className="w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm px-5 py-2.5 cursor-pointer">
              {loading ? "Signing up..." : "Create an account"}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Terms & Conditions Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h2>
            <div className="text-sm text-gray-700 space-y-3 overflow-y-auto max-h-[60vh] pr-2">
              <p><strong>1. Acceptance of Terms:</strong> By creating an account, you agree to abide by these Terms & Conditions.</p>
              <p><strong>2. Eligibility:</strong> You must be at least 18 years old to create an account.</p>
              <p><strong>3. Account Security:</strong> You are responsible for your login credentials and account activity.</p>
              <p><strong>4. Use of Platform:</strong> You agree to use the platform for lawful purposes only.</p>
              <p><strong>5. Privacy:</strong> Your information is handled as per our Privacy Policy.</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;
