import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAuth } from "../../context/useAuth";
import { api } from "../../services/api";

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
  const { authUser } = userAuth();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      if (data.adminCode) {
        payload.role = "admin";
        payload.adminCode = data.adminCode;
      }
      const response = await api.post("/user/signup", payload);
      toast.success(response.data.message);
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

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 py-8">
      <div className="w-full rounded-2xl border border-[#E9ECEF] bg-white shadow-lg sm:max-w-md">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-center text-2xl font-bold text-[#212529]">
            Create an Account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212529]">
                Username
                <span className="text-lg font-bold text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-lg border border-[#E9ECEF] bg-white p-2.5 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                {...register("username", { required: true, minLength: 3 })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">
                  Username is required (min 3 characters).
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212529]">
                Your Email
                <span className="text-lg font-bold text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-lg border border-[#E9ECEF] bg-white p-2.5 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email.",
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
                  className="w-full rounded-lg border border-[#E9ECEF] bg-white p-2.5 pr-10 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-[#495057] hover:text-[#212529]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#212529]">
                Confirm Password
                <span className="text-lg font-bold text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-[#E9ECEF] bg-white p-2.5 pr-10 text-[#212529] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0077B6]"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match.",
                  })}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 text-[#495057] hover:text-[#212529]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-[#E9ECEF] accent-[#0077B6] focus:ring-[#0077B6]"
                {...register("terms", { required: true })}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[#495057]">
                I accept the{" "}
                <button
                  type="button"
                  className="cursor-pointer font-semibold text-[#00B4D8] hover:underline"
                  onClick={() => setShowModal(true)}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">
                You must accept the terms.
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#FF7B54] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_10px_rgba(255,123,84,0.4)] transition-all duration-300 hover:bg-[#E85D04] hover:shadow-[0_0_15px_rgba(232,93,4,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create an Account"}
            </button>
            <p className="text-center text-sm text-[#495057]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#00B4D8] hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="m-4 w-full max-w-2xl rounded-2xl border border-[#E9ECEF] bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-[#212529]">
              Terms & Conditions
            </h2>
            <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-2 text-sm text-[#495057]">
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
                className="cursor-pointer rounded-lg bg-[#FF7B54] px-5 py-2 font-semibold text-white transition-colors hover:bg-[#E85D04]"
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
