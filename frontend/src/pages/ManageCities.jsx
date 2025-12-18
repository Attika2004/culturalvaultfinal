import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import "./ManageCities.css";

const ManageCities = () => {
  const [cities, setCities] = useState([]);

  // Add City
  const [newCityName, setNewCityName] = useState("");
  const [newProvince, setNewProvince] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLatitude, setNewLatitude] = useState("");
  const [newLongitude, setNewLongitude] = useState("");

  // Edit City
  const [editCityId, setEditCityId] = useState("");
  const [editCityName, setEditCityName] = useState("");
  const [editProvince, setEditProvince] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editLatitude, setEditLatitude] = useState("");
  const [editLongitude, setEditLongitude] = useState("");

  // Delete
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");

  const fetchCities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/cities");
      setCities(res.data.cities || []);
    } catch (err) {
      console.error("Error fetching cities:", err);
      alert("Failed to fetch cities");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async () => {
    if (!newCityName) return alert("City name is required!");

    try {
      await axios.post("http://localhost:5000/api/admin/cities/add", {
        CityName: newCityName,
        Province: newProvince,
        Description: newDescription,
        Latitude: newLatitude || null,
        Longitude: newLongitude || null
      });

      alert("City added successfully!");
      setNewCityName("");
      setNewProvince("");
      setNewDescription("");
      setNewLatitude("");
      setNewLongitude("");
      fetchCities();
    } catch (err) {
      console.error("Add city error:", err);
      alert("Failed to add city.");
    }
  };

  const handleEditCity = async () => {
    if (!editCityId || !editCityName) return alert("City ID and name required!");

    try {
      await axios.put(
        `http://localhost:5000/api/admin/cities/${editCityId}`,
        {
          CityName: editCityName,
          Province: editProvince,
          Description: editDescription,
          Latitude: editLatitude || null,
          Longitude: editLongitude || null
        }
      );

      alert("City updated successfully!");
      setEditCityId("");
      setEditCityName("");
      setEditProvince("");
      setEditDescription("");
      setEditLatitude("");
      setEditLongitude("");
      fetchCities();
    } catch (err) {
      console.error("Edit city error:", err);
      alert("Failed to update city.");
    }
  };

  const handleDeleteCity = async () => {
    const id =
      searchId ||
      cities.find(
        c => c.CityName.toLowerCase() === searchName.toLowerCase()
      )?.CityID;

    if (!id) return alert("City not found!");

    try {
      await axios.delete(`http://localhost:5000/api/admin/cities/${id}`);
      alert("City deleted successfully!");
      setSearchId("");
      setSearchName("");
      fetchCities();
    } catch (err) {
      console.error("Delete city error:", err);
      alert("Failed to delete city.");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-title">Manage Cities</h1>
        <p className="admin-subtitle">Add, edit or remove cities</p>

        <div className="form-grid">
          {/* Add */}
          <div className="admin-card">
            <h3>Add City</h3>
            <input placeholder="City Name" value={newCityName} onChange={e => setNewCityName(e.target.value)} />
            <input placeholder="Province" value={newProvince} onChange={e => setNewProvince(e.target.value)} />
            <textarea placeholder="Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
            <input type="number" placeholder="Latitude" value={newLatitude} onChange={e => setNewLatitude(e.target.value)} />
            <input type="number" placeholder="Longitude" value={newLongitude} onChange={e => setNewLongitude(e.target.value)} />
            <button className="btn primary" onClick={handleAddCity}>Add City</button>
          </div>

          {/* Edit */}
          <div className="admin-card">
            <h3>Edit City</h3>
            <input type="number" placeholder="City ID" value={editCityId} onChange={e => setEditCityId(e.target.value)} />
            <input placeholder="City Name" value={editCityName} onChange={e => setEditCityName(e.target.value)} />
            <input placeholder="Province" value={editProvince} onChange={e => setEditProvince(e.target.value)} />
            <textarea placeholder="Description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
            <button className="btn warning" onClick={handleEditCity}>Update City</button>
          </div>

          {/* Delete */}
          <div className="admin-card">
            <h3>Delete City</h3>
            <input type="number" placeholder="City ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
            <input placeholder="Or City Name" value={searchName} onChange={e => setSearchName(e.target.value)} />
            <button className="btn danger" onClick={handleDeleteCity}>Delete City</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <h3>All Cities</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Province</th>
                <th>Description</th>
                <th>Lat</th>
                <th>Lng</th>
              </tr>
            </thead>
            <tbody>
              {cities.map(c => (
                <tr key={c.CityID}>
                  <td>{c.CityID}</td>
                  <td>{c.CityName}</td>
                  <td>{c.Province}</td>
                  <td>{c.Description}</td>
                  <td>{c.Latitude}</td>
                  <td>{c.Longitude}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCities;
