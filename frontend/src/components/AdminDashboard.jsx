import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { userAuth } from "../context/AuthProvider";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("attractions");
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    area: "",
    pincode: "",
    description: "",
    image: "",
    rating: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = userAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData };
    if (!payload.image) delete payload.image;
    if (!payload.rating) delete payload.rating;
    else payload.rating = parseFloat(payload.rating);

    try {
      const endpoint = `/${activeTab}`;
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

      await axios.post(`${API_BASE}${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`${activeTab.slice(0, -1)} added successfully!`);
      // Reset form
      setFormData({
        name: "",
        city: "",
        area: "",
        pincode: "",
        description: "",
        image: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(
        error.response?.data?.message || "Failed to add item. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "attractions", label: "Add Attraction", icon: "🏛️" },
    { id: "cafes", label: "Add Cafe", icon: "☕" },
    { id: "restaurants", label: "Add Restaurant", icon: "🏨" },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-gray-900/50 p-6 md:p-8 rounded-2xl shadow-lg shadow-yellow-500/10 border border-yellow-500/30">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2 [text-shadow:_0_0_8px_theme(colors.yellow.500)]">
            Admin Dashboard
          </h1>
          <p className="text-yellow-200/80">
            Add new places to the CityBuddy database
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-yellow-500/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors duration-300 ${
                activeTab === tab.id
                  ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/30"
                  : "text-yellow-400 hover:bg-yellow-500/10"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name, City, Area, Pincode, Rating */}
            {[
              { name: "name", label: "Name *", placeholder: `Enter ${activeTab.slice(0, -1)} name`, type: "text", required: true },
              { name: "city", label: "City *", placeholder: "Enter city name", type: "text", required: true },
              { name: "area", label: "Area *", placeholder: "Enter area/location", type: "text", required: true },
              { name: "pincode", label: "Pincode *", placeholder: "Enter pincode", type: "text", required: true },
              { name: "rating", label: "Rating (1-5)", placeholder: "e.g., 4.5", type: "number", min: 1, max: 5, step: 0.1 },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-yellow-400 mb-2">{field.label}</label>
                <input {...field} value={formData[field.name]} onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-yellow-500/50"
                />
              </div>
            ))}

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-yellow-400 mb-2">Image URL</label>
              <input type="url" name="image" value={formData.image} onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-yellow-500/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-yellow-400 mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}
              required rows={4}
              className="w-full px-3 py-2 bg-gray-800 text-yellow-200 border border-yellow-500/40 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 placeholder:text-yellow-500/50"
              placeholder={`Describe this ${activeTab.slice(0, -1)}...`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" disabled={loading}
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(250,204,21,0.4)] hover:shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all duration-300"
            >
              {loading ? "Adding..." : `Add ${activeTab.slice(0, -1)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;