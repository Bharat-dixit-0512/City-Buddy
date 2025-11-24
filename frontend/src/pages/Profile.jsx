import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuth } from "../context/AuthProvider";
import { User, Mail, Award, Star } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const Profile = () => {
  const { authUser, login, refreshUser } = userAuth();
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const newPassword = watch("newPassword");

  const onPasswordSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const response = await axios.put(
        `${API_BASE}/user/update-password`,
        payload
      );
      toast.success(response.data.message);
      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAdminRequest = async () => {
    setRequestLoading(true);
    try {
      await axios.post(`${API_BASE}/user/request-admin`);
      await refreshUser();
      toast.success("Admin access request submitted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setRequestLoading(false);
    }
  };

  if (!authUser) {
    return <div className="text-center p-12">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          My Profile
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-lg border mb-8">
          <h2 className="text-2xl font-bold mb-4">Account Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="text-[#0077B6]" />
              <span>{authUser.username}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#0077B6]" />
              <span>{authUser.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="text-yellow-500" />
              <span>{authUser.points || 0} Points</span>
            </div>
            {authUser.badges && authUser.badges.length > 0 && (
              <div className="flex items-start gap-3 pt-2">
                <Award className="text-green-600 mt-1" />
                <div className="flex flex-wrap gap-2">
                  {authUser.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-xs bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {authUser.role === "user" && (
              <div className="pt-4 border-t mt-4">
                {authUser.adminRequestStatus === "none" && (
                  <button
                    onClick={handleAdminRequest}
                    disabled={requestLoading}
                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 disabled:opacity-50 cursor-pointer"
                  >
                    {requestLoading ? "Submitting..." : "Request Admin Access"}
                  </button>
                )}
                {authUser.adminRequestStatus === "pending" && (
                  <p className="text-yellow-600 font-medium">
                    Your admin request is pending review.
                  </p>
                )}
                {authUser.adminRequestStatus === "denied" && (
                  <p className="text-red-600 font-medium">
                    Your previous admin request was denied.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                {...register("currentPassword", {
                  required: "Current password is required.",
                })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required.",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters.",
                  },
                })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password.",
                  validate: (value) =>
                    value === newPassword || "The passwords do not match.",
                })}
                className="w-full p-2 border rounded-lg"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#FF7B54] text-white font-semibold rounded-lg hover:bg-[#E85D04] disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
