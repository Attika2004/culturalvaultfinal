import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCity,
  FaMapMarkedAlt,
  FaUserTie,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>

        <nav className="sidebar-menu">
          <NavLink to="/admin/dashboard" className="menu-item">
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>

          <NavLink to="/admin/manage-cities" className="menu-item">
            <FaCity className="icon" /> Manage Cities
          </NavLink>

          <NavLink to="/admin/manage-sites" className="menu-item">
            <FaMapMarkedAlt className="icon" /> Manage Sites
          </NavLink>

          <NavLink to="/admin/manage-agents" className="menu-item">
            <FaUserTie className="icon" /> Manage Agents
          </NavLink>

          <NavLink to="/admin/bookings" className="menu-item">
            <FaClipboardList className="icon" /> Bookings
          </NavLink>

          <NavLink to="/admin/logout" className="menu-item logout">
            <FaSignOutAlt className="icon" /> Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;