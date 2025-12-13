import React, { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import "./ManageSites.css";

const ManageSites = () => {
  const [editSiteId, setEditSiteId] = useState("");
  const [editSiteName, setEditSiteName] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editHistory, setEditHistory] = useState("");
  const [editImages, setEditImages] = useState([]);

  const [deleteSiteId, setDeleteSiteId] = useState("");
  const [deleteSiteName, setDeleteSiteName] = useState("");

  const [addSiteName, setAddSiteName] = useState("");
  const [addCity, setAddCity] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addHistory, setAddHistory] = useState("");
  const [addImages, setAddImages] = useState([]);

  const [sites, setSites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder functions
  const handleEditSite = () => {
    alert(`Site ${editSiteId} updated!`);
  };

  const handleDeleteSite = () => {
    if (deleteSiteId) {
      alert(`Site with ID ${deleteSiteId} deleted!`);
    } else if (deleteSiteName) {
      alert(`Site named "${deleteSiteName}" deleted!`);
    } else {
      alert("Enter Site ID or Name to delete!");
    }
  };

  const handleAddSite = () => {
    alert(`Site ${addSiteName} added!`);
  };

  const handleEditImagesChange = (e) => {
    setEditImages([...e.target.files]);
  };

  const handleAddImagesChange = (e) => {
    setAddImages([...e.target.files]);
  };

  useEffect(() => {
    setSites([
      {
        id: 1,
        name: "Badshahi Mosque",
        city: "Lahore",
        description: "Historic mosque",
        history: "Built in 1673",
        images: ["img1.jpg", "img2.jpg"]
      },
      {
        id: 2,
        name: "Clifton Beach",
        city: "Karachi",
        description: "Popular beach",
        history: "Famous tourist spot",
        images: ["img3.jpg"]
      }
    ]);
  }, []);

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.id.toString() === searchQuery
  );

  return (
    <AdminLayout>
    <div className="manage-sites-container">
      <h1 className="page-title">Manage Sites</h1>
      <p className="page-subtext">Edit, delete, add, or view sites below.</p>

      <div className="sites-sections">

        {/* Edit Site Section */}
        <section className="site-section">
          <h2>Edit Site</h2>
          <input
            type="text"
            placeholder="Site ID"
            value={editSiteId}
            onChange={(e) => setEditSiteId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Site Name"
            value={editSiteName}
            onChange={(e) => setEditSiteName(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={editCity}
            onChange={(e) => setEditCity(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <textarea
            placeholder="History"
            value={editHistory}
            onChange={(e) => setEditHistory(e.target.value)}
          />
          <input type="file" multiple onChange={handleEditImagesChange} />
          <button className="action-btn" onClick={handleEditSite}>
            Update Site
          </button>
        </section>

        {/* Delete Site Section */}
        <section className="site-section">
          <h2>Delete Site</h2>
          <input
            type="text"
            placeholder="Site ID"
            value={deleteSiteId}
            onChange={(e) => setDeleteSiteId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Or Site Name"
            value={deleteSiteName}
            onChange={(e) => setDeleteSiteName(e.target.value)}
          />
          <button className="action-btn delete-btn" onClick={handleDeleteSite}>
            Delete Site
          </button>
        </section>

        {/* Add Site Section */}
        <section className="site-section">
          <h2>Add Site</h2>
          <input
            type="text"
            placeholder="Site Name"
            value={addSiteName}
            onChange={(e) => setAddSiteName(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            value={addCity}
            onChange={(e) => setAddCity(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={addDescription}
            onChange={(e) => setAddDescription(e.target.value)}
          />
          <textarea
            placeholder="History"
            value={addHistory}
            onChange={(e) => setAddHistory(e.target.value)}
          />
          <input type="file" multiple onChange={handleAddImagesChange} />
          <button className="action-btn add-btn" onClick={handleAddSite}>
            Add Site
          </button>
        </section>

        {/* View/Search Sites Section */}
        <section className="site-section view-section">
          <h2>View/Search Sites</h2>
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="sites-list">
            {filteredSites.length === 0 ? (
              <p>No sites found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Description</th>
                    <th>History</th>
                    <th>Images</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map((site) => (
                    <tr key={site.id}>
                      <td>{site.id}</td>
                      <td>{site.name}</td>
                      <td>{site.city}</td>
                      <td>{site.description}</td>
                      <td>{site.history}</td>
                      <td>{site.images.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

      </div>
    </div>
    </AdminLayout>
  );
};

export default ManageSites;
