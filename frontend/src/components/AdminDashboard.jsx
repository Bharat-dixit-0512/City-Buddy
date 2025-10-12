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
    rating: ""
  });
  const [loading, setLoading] = useState(false);
  const { token } = userAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter out empty optional fields
    const payload = { ...formData };
    if (!payload.image) delete payload.image;
    if (!payload.rating) delete payload.rating;
    else payload.rating = parseFloat(payload.rating);

    try {
      const endpoint = `/${activeTab}`;
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";
      
      await axios.post(`${API_BASE}${endpoint}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`${activeTab.slice(0, -1)} added successfully!`);
      // Reset form
      setFormData({ name: "", city: "", area: "", pincode: "", description: "", image: "", rating: "" });
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(error.response?.data?.message || "Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "attractions", label: "Add Attraction", icon: "🏛️" },
    { id: "cafes", label: "Add Cafe", icon: "☕" },
    { id: "restaurants", label: "Add Restaurant/Hotel", icon: "🏨" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-lg border">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Add new places to the City Buddy database</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
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
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter ${activeTab.slice(0, -1)} name`}
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter city name"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area *</label>
              <input type="text" name="area" value={formData.area} onChange={handleInputChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter area/location"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter pincode"
              />
            </div>
            
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
              <input type="number" name="rating" value={formData.rating} onChange={handleInputChange}
                min="1" max="5" step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 4.5"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input type="url" name="image" value={formData.image} onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange}
              required rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder={`Describe this ${activeTab.slice(0, -1)}...`}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button type="submit" disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50"
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