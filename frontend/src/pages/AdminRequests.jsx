import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../components/shared/Spinner";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/requests`);
      setRequests(res.data);
    } catch (error) {
      toast.error("Could not fetch admin requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleResolve = async (userId, action) => {
    try {
      await axios.put(`${API_BASE}/admin/requests/${userId}`, { action });
      toast.success(`Request has been ${action}d.`);
      fetchRequests();
    } catch (error) {
      toast.error("Failed to resolve request.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Admin Requests</h2>
      {requests.length > 0 ? (
        <div className="space-y-3">
          {requests.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-3 border rounded-lg bg-gray-50"
            >
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleResolve(user._id, "approve")}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 cursor-pointer"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleResolve(user._id, "deny")}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 cursor-pointer"
                >
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No pending requests.</p>
      )}
    </div>
  );
};

export default AdminRequests;
