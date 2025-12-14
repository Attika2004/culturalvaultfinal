import React from "react";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import "./GuideLayout.css";

const GuideLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to home/login page
  };

  return (
    <div className="guide-container">
      {/* Sidebar */}
      <aside className="guide-sidebar">
        <h2 className="sidebar-title">Guide Panel</h2>

        <nav className="sidebar-menu">
          <NavLink to="/guide/dashboard" className="menu-item">
            <span className="icon">📊</span> Dashboard
          </NavLink>

          <NavLink to="/guide/availability" className="menu-item">
            <span className="icon">📋</span> Availability
          </NavLink>

          <NavLink to="/guide/bookings" className="menu-item">
            <span className="icon">📝</span> Bookings
          </NavLink>

          <NavLink to="/guide/calendar" className="menu-item">
            <span className="icon">📅</span> Calendar
          </NavLink>

          <NavLink to="/guide/schedule" className="menu-item">
            <span className="icon">🗓️</span> Schedule
          </NavLink>

          <button onClick={handleLogout} className="menu-item logout">
            <span className="icon">🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="guide-content">
        <Outlet />
      </main>
    </div>
  );
};

export default GuideLayout;