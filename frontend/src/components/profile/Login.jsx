import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // simple validation
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // 👉 dummy login (replace with API/backend later)
    if (formData.username === "admin" && formData.password === "123456") {
      alert("Login successful ✅");
      navigate("/"); // redirect to home after login
    } else {
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-[480px] w-full">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-black shadow-sm">
          <NavLink to='/'><h1 className="text-slate-900 text-center text-3xl font-semibold">
            Sign in
          </h1></NavLink>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            {/* Username */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-10 rounded-md outline-blue-600"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember"
                  type="checkbox"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-slate-300 rounded"
                  required
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

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

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
