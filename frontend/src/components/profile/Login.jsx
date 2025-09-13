import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // on submit
  const onSubmit = (data) => {
    const { username, password } = data;

    // dummy login validation
    if (username === "admin" && password === "123456") {
      alert("Login successful ✅");
      navigate("/");
    } else {
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-[480px] w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black shadow-sm">
          <NavLink to="/">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h1>
          </NavLink>

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
            {/* Username */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-10 rounded-md outline-blue-600"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-slate-300 rounded"
                  {...register("remember")}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-slate-900"
                >
                  Remember me
                </label>
              </div>
              <NavLink
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:underline font-semibold"
              >
                Forgot password?
              </NavLink>
            </div>

            {/* Submit */}
            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none cursor-pointer"
              >
                Sign in
              </button>
            </div>

            {/* Register */}
            <p className="text-slate-900 text-sm !mt-6 text-center">
              Don’t have an account?{" "}
              <NavLink
                to="/Signup"
                className="text-indigo-600 hover:underline ml-1 font-semibold"
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
