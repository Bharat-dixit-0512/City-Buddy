import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userAuth } from "../context/useAuth";
import { User, Mail, Award, Star } from "lucide-react";
import { api } from "../services/api";

const Profile = () => {
  const { authUser, refreshUser } = userAuth();
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
      const response = await api.put("/user/update-password", payload);
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
      await api.post("/user/request-admin");
      await refreshUser();
      toast.success("Admin access request submitted successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit request.");
    } finally {
      setRequestLoading(false);
    }
  };

  if (!authUser) {
    return <div className="p-12 text-center">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          My Profile
        </h1>

        <div className="mb-8 rounded-2xl border bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Account Details</h2>
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
                <Award className="mt-1 text-green-600" />
                <div className="flex flex-wrap gap-2">
                  {authUser.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {authUser.role === "user" && (
              <div className="mt-4 border-t pt-4">
                {authUser.adminRequestStatus === "none" && (
                  <button
                    onClick={handleAdminRequest}
                    disabled={requestLoading}
                    className="cursor-pointer rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600 disabled:opacity-50"
                  >
                    {requestLoading ? "Submitting..." : "Request Admin Access"}
                  </button>
                )}
                {authUser.adminRequestStatus === "pending" && (
                  <p className="font-medium text-yellow-600">
                    Your admin request is pending review.
                  </p>
                )}
                {authUser.adminRequestStatus === "denied" && (
                  <p className="font-medium text-red-600">
                    Your previous admin request was denied.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                {...register("currentPassword", {
                  required: "Current password is required.",
                })}
                className="w-full rounded-lg border p-2"
              />
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
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
                className="w-full rounded-lg border p-2"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password.",
                  validate: (value) =>
                    value === newPassword || "The passwords do not match.",
                })}
                className="w-full rounded-lg border p-2"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-lg bg-[#FF7B54] px-6 py-2 font-semibold text-white hover:bg-[#E85D04] disabled:opacity-50"
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
