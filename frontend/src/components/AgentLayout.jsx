import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AgentLayout.css";

const AgentLayout = ({ children }) => {
  return (
    <div className="agent-container">
      {/* Sidebar */}
      <aside className="agent-sidebar">
        <h2 className="sidebar-title">Agent Panel</h2>

        <nav className="sidebar-menu">
          <NavLink to="/agent/dashboard" className="menu-item">
            <FaTachometerAlt className="icon" /> Dashboard
          </NavLink>

          <NavLink to="/agent/view-bookings" className="menu-item">
            <FaClipboardList className="icon" /> View Bookings
          </NavLink>

          <NavLink to="/" className="menu-item logout">
            <FaSignOutAlt className="icon" /> Logout
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="agent-content">{children}</main>
    </div>
  );
};

export default AgentLayout;