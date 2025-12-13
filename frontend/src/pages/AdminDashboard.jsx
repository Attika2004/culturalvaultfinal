import React from "react";
import AdminLayout from "../components/AdminLayout";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="dashboard-container">
        {/* Welcome Section */}
        <h1 className="welcome-text">Welcome, Admin!</h1>
        <p className="welcome-subtext">Here is your system overview</p>

        {/* Stats Boxes */}
        <div className="stats-grid">
          <div className="stat-box">
            <h2>12</h2>
            <p>Cities</p>
          </div>

          <div className="stat-box">
            <h2>34</h2>
            <p>Sites</p>
          </div>

          <div className="stat-box">
            <h2>120</h2>
            <p>Registered Users</p>
          </div>

          <div className="stat-box">
            <h2>8</h2>
            <p>Active Agents</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
