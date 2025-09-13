import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    // ✅ Hash password before sending
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userData = {
      email: data.email,
      password: hashedPassword,
    };

    console.log("User registered with hashed password:", userData);
    alert("Signup successful ✅");

    reset(); // clear form
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full bg-white rounded-2xl shadow border sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-center text-gray-900 md:text-2xl">
            Create an account
          </h1>

          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
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

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 pr-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded"
                {...register("terms", {
                  required: "You must accept the terms & conditions",
                })}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                I accept the{" "}
                <button
                  type="button"
                  className="text-indigo-600 hover:underline cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  Terms and Conditions
                </button>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm px-5 py-2.5"
            >
              Create an account
            </button>

            {/* Login link */}
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Modal for Terms */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full p-6 rounded-2xl shadow-lg relative overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Terms & Conditions
            </h2>
            <div className="text-sm text-gray-700 space-y-3 overflow-y-auto max-h-[60vh] pr-2">
              <p>
                <strong>1. Acceptance of Terms:</strong> By creating an account
                on CityBuddy, you agree to abide by these Terms & Conditions.
              </p>
              <p>
                <strong>2. Eligibility:</strong> You must be at least 18 years
                old (or have guardian consent) to create an account.
              </p>
              <p>
                <strong>3. Account Security:</strong> You are responsible for
                your login credentials and account activity.
              </p>
              <p>
                <strong>4. Use of Platform:</strong> You agree to use CityBuddy
                for lawful purposes only and not post harmful or misleading
                content.
              </p>
              <p>
                <strong>5. User Content:</strong> Reviews must be respectful,
                accurate, and genuine. CityBuddy may remove inappropriate
                content.
              </p>
              <p>
                <strong>6. Privacy:</strong> We collect and use your information
                in line with our Privacy Policy.
              </p>
              <p>
                <strong>7. Limitation of Liability:</strong> CityBuddy is not
                responsible for third-party services (e.g., hotels, cafes).
              </p>
              <p>
                <strong>8. Updates:</strong> Terms may be updated from time to
                time. Continued use means you accept the new terms.
              </p>
              <p>
                <strong>9. Contact:</strong>{" "}
                <a href="mailto:komal.pater_cs23@gla.ac.in">
                  komal.pater_cs23@gla.ac.in
                </a>{" "}
                | <a href="tel:+91 9876543210">+91 9876543210</a>
              </p>
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer"
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
