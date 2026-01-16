import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Edit, Trash2, UploadCloud } from "lucide-react";
import Spinner from "./shared/Spinner";
import AdminRequests from "../pages/AdminRequests";
import { userAuth } from "../context/AuthProvider";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const AdminDashboard = () => {
  const { isSuperAdmin } = userAuth();
  const initialTab = isSuperAdmin ? "Admin Requests" : "Restaurant";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({ name: "", city: "", area: "", pincode: "", description: "", imageFile: null, latitude: "", longitude: "", phone: "", website: "", tags: "", priceForTwo: "", pricePerNight: "", priceCategory: "Mid-Range", category: "" });

  const fetchData = async () => {
    if (activeTab === 'Admin Requests') return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/places?category=${activeTab}`);
      setItems(res.data.data || []);
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab}s`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'Admin Requests') {
      fetchData();
    }
  }, [activeTab]);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== 'Admin Requests') {
      resetForm(tab);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
        setFormData(prev => ({ ...prev, imageFile: files[0] }));
        setImagePreview(URL.createObjectURL(files[0]));
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = (category = activeTab) => {
    setFormData({ name: "", city: "", area: "", pincode: "", description: "", imageFile: null, latitude: "", longitude: "", phone: "", website: "", tags: "", priceForTwo: "", pricePerNight: "", priceCategory: "Mid-Range", category });
    setIsEditing(null);
    setImagePreview("");
  };

  const handleEdit = (item) => {
    setIsEditing(item._id);
    setFormData({ ...item, imageFile: null, tags: item.tags ? item.tags.join(', ') : "" });
    setImagePreview(item.image || "");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${API_BASE}/places/${id}`);
        toast.success("Item deleted successfully!");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete item.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSubmit = new FormData();
    const { imageFile, ...payload } = formData;
    payload.category = activeTab;

    if (imageFile) {
        dataToSubmit.append('image', imageFile);
    }

    for (const key in payload) {
        if (payload[key] !== null && payload[key] !== undefined) {
            dataToSubmit.append(key, payload[key]);
        }
    }
    
    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      if (isEditing) {
        await axios.put(`${API_BASE}/places/${isEditing}`, dataToSubmit, config);
        toast.success("Item updated successfully!");
      } else {
        if (!imageFile) {
            toast.error("Please select an image for the new item.");
            setLoading(false);
            return;
        }
        await axios.post(`${API_BASE}/places`, dataToSubmit, config);
        toast.success("Item added successfully!");
      }
      resetForm(activeTab);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };
  
  const allTabs = [
    { id: "Admin Requests", label: "Admin Requests", superAdminOnly: true },
    { id: "Restaurant", label: "Restaurants", superAdminOnly: false },
    { id: "Hotel", label: "Hotels", superAdminOnly: false },
    { id: "Guesthouse", label: "Guesthouses", superAdminOnly: false },
    { id: "Cafe", label: "Cafes", superAdminOnly: false },
    { id: "Attraction", label: "Attractions", superAdminOnly: false },
  ];
  
  const tabs = allTabs.filter(tab => !tab.superAdminOnly || isSuperAdmin);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab !== 'Admin Requests' && (
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border">
              <h2 className="text-2xl font-bold mb-4">{isEditing ? `Edit ${activeTab}` : `Add New ${activeTab}`}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "city", "area", "pincode", "phone", "website", "tags"].map(field => (
                  <div key={field}><label className="block text-sm font-medium capitalize">{field} {field === 'tags' && '(comma-separated)'}</label><input type="text" name={field} value={formData[field] || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required={['name','city','area','pincode'].includes(field)} /></div>
                ))}
                 <div>
                    <label className="block text-sm font-medium">Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto"/>
                            ) : (
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400"/>
                            )}
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>{isEditing ? 'Upload a new file' : 'Upload a file'}</span>
                                    <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleInputChange} accept="image/*"/>
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium">Latitude</label><input type="number" step="any" name="latitude" value={formData.latitude || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium">Longitude</label><input type="number" step="any" name="longitude" value={formData.longitude || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
                {activeTab === 'Restaurant' && (
                  <>
                    <div><label className="block text-sm font-medium">Price For Two (₹)</label><input type="number" name="priceForTwo" value={formData.priceForTwo || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                    <div><label className="block text-sm font-medium">Price Category</label><select name="priceCategory" value={formData.priceCategory} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg bg-white cursor-pointer"><option value="Budget">Budget</option><option value="Mid-Range">Mid-Range</option><option value="Luxury">Luxury</option></select></div>
                  </>
                )}
                {(activeTab === 'Hotel' || activeTab === 'Guesthouse') && (
                  <div><label className="block text-sm font-medium">Price Per Night (₹)</label><input type="number" name="pricePerNight" value={formData.pricePerNight || ''} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" /></div>
                )}
                <div><label className="block text-sm font-medium">Description</label><textarea name="description" value={formData.description || ''} onChange={handleInputChange} required rows={4} className="w-full px-3 py-2 border rounded-lg" /></div>
                <div className="flex gap-4">
                  <button type="submit" disabled={loading} className="px-6 py-2 bg-[#FF7B54] text-white rounded-lg w-full cursor-pointer disabled:bg-opacity-50 disabled:cursor-not-allowed">{loading ? "Saving..." : isEditing ? "Update" : "Add"}</button>
                  {isEditing && <button type="button" onClick={() => resetForm()} className="px-6 py-2 bg-gray-300 rounded-lg w-full cursor-pointer">Cancel</button>}
                </div>
              </form>
            </div>
          )}
          <div className={`${activeTab === 'Admin Requests' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            <div className="bg-white p-6 rounded-2xl shadow-lg border h-full">
              <div className="flex gap-2 mb-4 border-b flex-wrap">
                {tabs.map((tab) => (<button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`px-4 py-2 font-medium cursor-pointer ${activeTab === tab.id ? "border-b-2 border-[#FF7B54] text-[#FF7B54]" : "text-gray-600"}`}>{tab.label}</button>))}
              </div>
              {activeTab === 'Admin Requests' && isSuperAdmin ? (
                <AdminRequests />
              ) : (
                loading ? <Spinner /> : (
                  <div className="space-y-3">
                    {items.length > 0 ? items.map(item => (
                      <div key={item._id} className="flex justify-between items-center p-3 border rounded-lg">
                        <span>{item.name} - <span className="text-sm text-gray-500">{item.city}</span></span>
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(item)} className="cursor-pointer"><Edit size={18} className="text-blue-500" /></button>
                          <button onClick={() => handleDelete(item._id)} className="cursor-pointer"><Trash2 size={18} className="text-red-500" /></button>
                        </div>
                      </div>
                    )) : <p>No {activeTab}s found.</p>}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;