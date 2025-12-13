import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import "./ManageCities.css";

const ManageCities = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const cities = [
    { id: 1, name: "Lahore", province: "Punjab", country: "Pakistan" },
    { id: 2, name: "Karachi", province: "Sindh", country: "Pakistan" },
    { id: 3, name: "Islamabad", province: "Capital Territory", country: "Pakistan" }
  ];

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.id.toString() === searchQuery
  );

  return (
    <AdminLayout>
      <div className="cities-container">
        <h1 className="page-title">Manage Cities</h1>
        <p className="page-subtext">Add, edit, delete, or view city details.</p>

        <div className="cities-grid">

          {/* Edit City */}
          <section className="city-section">
            <h2>Edit City</h2>
            <input type="text" placeholder="City ID" />
            <input type="text" placeholder="City Name" />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Country" />
            <button className="btn update-btn">Update City</button>
          </section>

          {/* Delete City */}
          <section className="city-section">
            <h2>Delete City</h2>
            <input type="text" placeholder="City ID" />
            <input type="text" placeholder="Or City Name" />
            <button className="btn delete-btn">Delete City</button>
          </section>

          {/* Add City */}
          <section className="city-section">
            <h2>Add City</h2>
            <input type="text" placeholder="City Name" />
            <input type="text" placeholder="Province" />
            <input type="text" placeholder="Country" />
            <button className="btn add-btn">Add City</button>
          </section>

        </div>

        {/* View/Search Section */}
        <section className="view-section">
          <h2>View / Search Cities</h2>
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="cities-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>City</th>
                  <th>Province</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <tr key={city.id}>
                      <td>{city.id}</td>
                      <td>{city.name}</td>
                      <td>{city.province}</td>
                      <td>{city.country}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No cities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default ManageCities;
