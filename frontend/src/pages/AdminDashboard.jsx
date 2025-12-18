import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    cities: 0,
    sites: 0,
    users: 0,
    agents: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/dashboard/stats"
        );
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-page">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">System overview & statistics</p>

        <div className="dashboard-cards">
          <div className="stat-box">
            <h2>{stats.cities}</h2>
            <p>Cities</p>
          </div>

          <div className="stat-box">
            <h2>{stats.sites}</h2>
            <p>Cultural Sites</p>
          </div>

          <div className="stat-box">
            <h2>{stats.users}</h2>
            <p>Registered Users</p>
          </div>

          <div className="stat-box">
            <h2>{stats.agents}</h2>
            <p>Tour Agents</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;