import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import "./ManageSites.css";

const ManageSites = () => {
  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ADD
  const [addSiteName, setAddSiteName] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addCategory, setAddCategory] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addHistory, setAddHistory] = useState("");
  const [addLatitude, setAddLatitude] = useState("");
  const [addLongitude, setAddLongitude] = useState("");
  const [addImage, setAddImage] = useState(null);

  // EDIT
  const [editSiteId, setEditSiteId] = useState("");
  const [editSiteName, setEditSiteName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editHistory, setEditHistory] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");
  const [editImage, setEditImage] = useState(null);

  // DELETE
  const [deleteSiteId, setDeleteSiteId] = useState("");

  const fetchSites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/sites");
      setSites(res.data.sites || []); // Make sure to use .sites if your API wraps data
    } catch (err) {
      console.error(err);
      alert("Failed to fetch sites");
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleAddSite = async () => {
    if (!addSiteName || !addCity || !addCategory)
      return alert("Site Name, City ID & Category ID required");

    try {
      const fd = new FormData();
      fd.append("SiteName", addSiteName);
      fd.append("CityID", addCity);
      fd.append("CategoryID", addCategory);
      fd.append("Description", addDescription);
      fd.append("History", addHistory);
      fd.append("Latitude", addLatitude);
      fd.append("Longitude", addLongitude);
      if (addImage) fd.append("MainImage", addImage);

      await axios.post("http://localhost:5000/api/admin/sites/add", fd);

      alert("Site added successfully!");
      fetchSites();

      setAddSiteName("");
      setAddCity("");
      setAddCategory("");
      setAddDescription("");
      setAddHistory("");
      setAddLatitude("");
      setAddLongitude("");
      setAddImage(null);
    } catch (err) {
      console.error("Add site error:", err);
      alert("Failed to add site");
    }
  };

  const handleEditSite = async () => {
    if (!editSiteId || !editSiteName || !editCity || !editCategory)
      return alert("All edit fields required");

    try {
      const fd = new FormData();
      fd.append("SiteName", editSiteName);
      fd.append("CityID", editCity);
      fd.append("CategoryID", editCategory);
      fd.append("Description", editDescription);
      fd.append("History", editHistory);
      fd.append("Latitude", editLatitude);
      fd.append("Longitude", editLongitude);
      if (editImage) fd.append("MainImage", editImage);

      await axios.put(
        `http://localhost:5000/api/admin/sites/${editSiteId}`,
        fd
      );

      alert("Site updated successfully!");
      fetchSites();

      setEditSiteId("");
      setEditSiteName("");
      setEditCity("");
      setEditCategory("");
      setEditDescription("");
      setEditHistory("");
      setEditLatitude("");
      setEditLongitude("");
      setEditImage(null);
    } catch (err) {
      console.error("Edit site error:", err);
      alert("Failed to update site");
    }
  };

  const handleDeleteSite = async () => {
    if (!deleteSiteId) return alert("Site ID required");

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/sites/${deleteSiteId}`
      );
      alert("Site deleted successfully!");
      fetchSites();
      setDeleteSiteId("");
    } catch (err) {
      console.error("Delete site error:", err);
      alert("Failed to delete site");
    }
  };

  const filteredSites = sites.filter(
    s =>
      s.SiteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.SiteID.toString() === searchQuery
  );

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-title">Manage Sites</h1>
        <p className="admin-subtitle">Add, edit or remove cultural sites</p>

        <div className="form-grid">
          {/* ADD */}
          <div className="admin-card">
            <h3>Add Site</h3>
            <input placeholder="Site Name" value={addSiteName} onChange={e => setAddSiteName(e.target.value)} />
            <input placeholder="City ID" value={addCity} onChange={e => setAddCity(e.target.value)} />
            <input placeholder="Category ID" value={addCategory} onChange={e => setAddCategory(e.target.value)} />
            <textarea placeholder="Description" value={addDescription} onChange={e => setAddDescription(e.target.value)} />
            <textarea placeholder="History" value={addHistory} onChange={e => setAddHistory(e.target.value)} />
            <input placeholder="Latitude" value={addLatitude} onChange={e => setAddLatitude(e.target.value)} />
            <input placeholder="Longitude" value={addLongitude} onChange={e => setAddLongitude(e.target.value)} />
            <input type="file" onChange={e => setAddImage(e.target.files[0])} />
            <button className="btn primary" onClick={handleAddSite}>Add Site</button>
          </div>

          {/* EDIT */}
          <div className="admin-card">
            <h3>Edit Site</h3>
            <input placeholder="Site ID" value={editSiteId} onChange={e => setEditSiteId(e.target.value)} />
            <input placeholder="Site Name" value={editSiteName} onChange={e => setEditSiteName(e.target.value)} />
            <input placeholder="City ID" value={editCity} onChange={e => setEditCity(e.target.value)} />
            <input placeholder="Category ID" value={editCategory} onChange={e => setEditCategory(e.target.value)} />
            <textarea placeholder="Description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            <textarea placeholder="History" value={editHistory} onChange={e => setEditHistory(e.target.value)} />
            <input type="file" onChange={e => setEditImage(e.target.files[0])} />
            <button className="btn warning" onClick={handleEditSite}>Update Site</button>
          </div>

          {/* DELETE */}
          <div className="admin-card">
            <h3>Delete Site</h3>
            <input placeholder="Site ID" value={deleteSiteId} onChange={e => setDeleteSiteId(e.target.value)} />
            <button className="btn danger" onClick={handleDeleteSite}>Delete Site</button>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <h3>All Sites</h3>
          <input
            className="search-input"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>City</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredSites.map(site => (
                <tr key={site.SiteID}>
                  <td>{site.SiteID}</td>
                  <td>{site.SiteName}</td>
                  <td>{site.CityID}</td>
                  <td>{site.CategoryID}</td>
                  <td>
                    {site.MainImageURL ? (
                      <img
                        src={`http://localhost:5000/uploads/${site.MainImageURL}`}
                        alt=""
                        style={{ width: "80px", height: "50px", objectFit: "cover" }}
                      />
                    ) : "No Image"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageSites;
