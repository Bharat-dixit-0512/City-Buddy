import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      // This part for admin registration is kept from your original code
      if (data.adminCode) {
        payload.role = "admin";
        payload.adminCode = data.adminCode;
      }

      const response = await axios.post(`${API_BASE}/user/signup`, payload);

      toast.success(response.data.message);
      if (response.data.usingFallback) {
        toast("Server using local fallback storage (development)");
      }
      reset();
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const serverMsg = error.response.data?.message || "Signup failed";
        toast.error(serverMsg);
      } else {
        toast.error("Something went wrong. Try again!");
      }
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full bg-gray-900/50 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30 sm:max-w-md">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center text-yellow-400 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            Create an Account
          </h1>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Username */}
            <div>
              <label className="block mb-2 text-sm font-medium text-yellow-400">
                Username<span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">
                  Username is required (min 3 characters).
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-yellow-400">
                Your Email<span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email.",
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
              <label className="block mb-2 text-sm font-medium text-yellow-400">
                Password<span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-yellow-400/70 hover:text-yellow-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-yellow-400">
                Confirm Password<span className="text-red-400 font-bold text-lg">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-yellow-500/50"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match.",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-yellow-400/70 hover:text-yellow-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border-yellow-500/40 rounded bg-gray-800 focus:ring-yellow-500 accent-yellow-500 cursor-pointer"
                {...register("terms", { required: true })}
              />
              <label
                htmlFor="terms"
                className="ml-2 text-sm text-yellow-200/80"
              >
                I accept the{" "}
                <button
                  type="button"
                  className="text-yellow-300 hover:underline cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm">
                You must accept the terms.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-black bg-yellow-500 hover:bg-yellow-400 rounded-lg text-sm font-semibold px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              {loading ? "Creating Account..." : "Create an Account"}
            </button>

            <p className="text-sm text-yellow-200/80 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-300 hover:underline font-semibold"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Themed Terms & Conditions Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 max-w-2xl w-full p-6 rounded-2xl shadow-lg border border-yellow-500/30 m-4">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              Terms & Conditions
            </h2>
            <div className="text-sm text-yellow-200/90 space-y-3 overflow-y-auto max-h-[60vh] pr-2">
              <p>
                <strong>1. Acceptance of Terms:</strong> By creating an
                account, you agree to abide by these Terms & Conditions.
              </p>
              <p>
                <strong>2. Eligibility:</strong> You must be at least 18 years
                old to create an account.
              </p>
              <p>
                <strong>3. Account Security:</strong> You are responsible for
                your login credentials and all activity under your account.
              </p>
              <p>
                <strong>4. Use of Platform:</strong> You agree to use the
                platform for lawful purposes and not to post harmful or illegal
                content.
              </p>
              <p>
                <strong>5. Privacy:</strong> Your information is handled as per
                our Privacy Policy.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;