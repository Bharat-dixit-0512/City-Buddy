import { useState } from "react";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAuth } from "../../context/useAuth";
import { api } from "../../services/api";

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
      const response = await api.post("/user/login", data);
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-lg sm:p-8">
          <h1 className="text-center text-3xl font-semibold text-[#212529]">
            Sign In
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-12 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212529]">
                Email ID
                <span className="text-lg font-bold text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-lg border border-[#E9ECEF] bg-white px-4 py-3 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212529]">
                Password
                <span className="text-lg font-bold text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-[#E9ECEF] bg-white px-4 py-3 pr-10 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer text-[#495057] hover:text-[#212529]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FF7B54] px-4 py-3 text-base font-semibold tracking-wide text-white shadow-[0_0_10px_rgba(255,123,84,0.4)] transition-all duration-300 hover:bg-[#E85D04] hover:shadow-[0_0_15px_rgba(232,93,4,0.6)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <p className="!mt-6 text-center text-sm text-[#495057]">
              Don't have an account?{" "}
              <NavLink
                to="/signup"
                className="ml-1 font-semibold text-[#00B4D8] hover:underline"
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
