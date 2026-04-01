import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit, Trash2, UploadCloud } from "lucide-react";
import Spinner from "./shared/Spinner";
import AdminRequests from "../pages/AdminRequests";
import { userAuth } from "../context/useAuth";
import { api, invalidateCache } from "../services/api";

const initialFormState = {
  name: "",
  city: "",
  area: "",
  pincode: "",
  description: "",
  imageFile: null,
  latitude: "",
  longitude: "",
  phone: "",
  website: "",
  tags: "",
  priceForTwo: "",
  pricePerNight: "",
  priceCategory: "Mid-Range",
  category: "",
};

const AdminDashboard = () => {
  const { isSuperAdmin } = userAuth();
  const initialTab = isSuperAdmin ? "Admin Requests" : "Restaurant";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState(initialFormState);

  const resetDataCaches = () => {
    invalidateCache("/home", "/places", "/search");
  };

  const fetchData = useCallback(async () => {
    if (activeTab === "Admin Requests") {
      return;
    }

    setLoading(true);
    try {
      const res = await api.get("/places", {
        params: { category: activeTab },
      });
      setItems(res.data.data || []);
    } catch {
      toast.error(`Failed to fetch ${activeTab}s`);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== "Admin Requests") {
      fetchData();
    }
  }, [activeTab, fetchData]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "Admin Requests") {
      resetForm(tab);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image" && files[0]) {
      setFormData((previous) => ({ ...previous, imageFile: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
      return;
    }

    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const resetForm = (category = activeTab) => {
    setFormData({ ...initialFormState, category });
    setIsEditing(null);
    setImagePreview("");
  };

  const handleEdit = (item) => {
    setIsEditing(item._id);
    setFormData({
      ...item,
      imageFile: null,
      tags: item.tags ? item.tags.join(", ") : "",
    });
    setImagePreview(item.image || "");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }

    try {
      await api.delete(`/places/${id}`);
      resetDataCaches();
      toast.success("Item deleted successfully!");
      fetchData();
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const dataToSubmit = new FormData();
    const { imageFile, ...payload } = formData;
    payload.category = activeTab;

    if (imageFile) {
      dataToSubmit.append("image", imageFile);
    }

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        dataToSubmit.append(key, value);
      }
    });

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      if (isEditing) {
        await api.put(`/places/${isEditing}`, dataToSubmit, config);
        toast.success("Item updated successfully!");
      } else {
        if (!imageFile) {
          toast.error("Please select an image for the new item.");
          setLoading(false);
          return;
        }
        await api.post("/places", dataToSubmit, config);
        toast.success("Item added successfully!");
      }

      resetDataCaches();
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

  const tabs = allTabs.filter((tab) => !tab.superAdminOnly || isSuperAdmin);

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {activeTab !== "Admin Requests" && (
            <div className="rounded-2xl border bg-white p-6 shadow-lg lg:col-span-1">
              <h2 className="mb-4 text-2xl font-bold">
                {isEditing ? `Edit ${activeTab}` : `Add New ${activeTab}`}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  "name",
                  "city",
                  "area",
                  "pincode",
                  "phone",
                  "website",
                  "tags",
                ].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium capitalize">
                      {field} {field === "tags" && "(comma-separated)"}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border px-3 py-2"
                      required={["name", "city", "area", "pincode"].includes(
                        field
                      )}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium">Image</label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-24 w-auto"
                        />
                      ) : (
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <span>
                            {isEditing ? "Upload a new file" : "Upload a file"}
                          </span>
                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={handleInputChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>
                </div>
                {activeTab === "Restaurant" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium">
                        Price For Two
                      </label>
                      <input
                        type="number"
                        name="priceForTwo"
                        value={formData.priceForTwo || ""}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">
                        Price Category
                      </label>
                      <select
                        name="priceCategory"
                        value={formData.priceCategory}
                        onChange={handleInputChange}
                        className="w-full cursor-pointer rounded-lg border bg-white px-3 py-2"
                      >
                        <option value="Budget">Budget</option>
                        <option value="Mid-Range">Mid-Range</option>
                        <option value="Luxury">Luxury</option>
                      </select>
                    </div>
                  </>
                )}
                {(activeTab === "Hotel" || activeTab === "Guesthouse") && (
                  <div>
                    <label className="block text-sm font-medium">
                      Price Per Night
                    </label>
                    <input
                      type="number"
                      name="pricePerNight"
                      value={formData.pricePerNight || ""}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border px-3 py-2"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full rounded-lg border px-3 py-2"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg bg-[#FF7B54] px-6 py-2 text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
                  >
                    {loading ? "Saving..." : isEditing ? "Update" : "Add"}
                  </button>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => resetForm()}
                      className="w-full cursor-pointer rounded-lg bg-gray-300 px-6 py-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
          <div
            className={`${
              activeTab === "Admin Requests" ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <div className="h-full rounded-2xl border bg-white p-6 shadow-lg">
              <div className="mb-4 flex flex-wrap gap-2 border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`cursor-pointer px-4 py-2 font-medium ${
                      activeTab === tab.id
                        ? "border-b-2 border-[#FF7B54] text-[#FF7B54]"
                        : "text-gray-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {activeTab === "Admin Requests" && isSuperAdmin ? (
                <AdminRequests />
              ) : loading ? (
                <Spinner />
              ) : (
                <div className="space-y-3">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span>
                          {item.name} -{" "}
                          <span className="text-sm text-gray-500">
                            {item.city}
                          </span>
                        </span>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer"
                            type="button"
                          >
                            <Edit size={18} className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="cursor-pointer"
                            type="button"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No {activeTab}s found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
