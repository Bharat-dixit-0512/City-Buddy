import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/shared/Spinner";
import { api } from "../services/api";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/requests");
      setRequests(res.data);
    } catch {
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
      await api.put(`/admin/requests/${userId}`, { action });
      toast.success(`Request has been ${action}d.`);
      fetchRequests();
    } catch {
      toast.error("Failed to resolve request.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Pending Admin Requests</h2>
      {requests.length > 0 ? (
        <div className="space-y-3">
          {requests.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between rounded-lg border bg-gray-50 p-3"
            >
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleResolve(user._id, "approve")}
                  className="cursor-pointer rounded-lg bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleResolve(user._id, "deny")}
                  className="cursor-pointer rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
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
