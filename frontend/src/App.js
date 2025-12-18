import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CitySelection from "./pages/CitySelection";
import LahoreOptions from "./pages/LahoreOptions";
import LahoreSites from "./pages/LahoreSites";
import AboutUs from "./pages/AboutUs";
import TourBooking from "./pages/TourBooking";
import MyBookings from "./pages/MyBookings";
import LahoreEvents from "./pages/LahoreEvents";

// Site pages
import BadshahiMosque from "./pages/BadshahiMosque";
import LahoreFort from "./pages/LahoreFort";
import Minar from "./pages/Minar";
import Shalimar from "./pages/Shalimar";
import Museum from "./pages/Museum";
import WazirKhan from "./pages/WazirKhan";
import FoodStreet from "./pages/FoodStreet";
import WalledCity from "./pages/WalledCity";
import WaghaBorder from "./pages/WaghaBorder";
import Tomb from "./pages/Tomb";
import Bagh from "./pages/Bagh";
import Anarkali from "./pages/Anarkali";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import ManageCities from "./pages/ManageCities";
import ManageSites from "./pages/ManageSites";
import ManageAgents from "./pages/ManageAgents";
import Bookings from "./pages/Bookings";

// Agent Pages
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";
import AgentViewBookings from "./pages/AgentViewBookings";


function App() {
  return (
    <Routes>
      {/* Public/User pages */}
      <Route path="/" element={<CitySelection />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/city-selection" element={<CitySelection />} />
      <Route path="/lahore-options" element={<LahoreOptions />} />
      <Route path="/lahore-sites" element={<LahoreSites />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/book-tour" element={<TourBooking />} />
      <Route path="/my-bookings" element={<MyBookings />} />

      <Route path="/badshahi-mosque" element={<BadshahiMosque />} />
      <Route path="/lahore-fort" element={<LahoreFort />} />
      <Route path="/minar-e-pakistan" element={<Minar />} />
      <Route path="/shalimar-gardens" element={<Shalimar />} />
      <Route path="/lahore-museum" element={<Museum />} />
      <Route path="/wazir-khan-mosque" element={<WazirKhan />} />
      <Route path="/food-street" element={<FoodStreet />} />
      <Route path="/walled-city" element={<WalledCity />} />
      <Route path="/wagha-border" element={<WaghaBorder />} />
      <Route path="/jahangir-tomb" element={<Tomb />} />
      <Route path="/bagh-e-jinnah" element={<Bagh />} />
      <Route path="/anarkali-bazaar" element={<Anarkali />} />
      <Route path="/lahore-events" element={<LahoreEvents />} />
      <Route path="/tour-booking" element={<TourBooking />} />
      

      {/* Admin routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/manage-cities" element={<ManageCities />} />
      <Route path="/admin/manage-sites" element={<ManageSites />} />
      <Route path="/admin/manage-agents" element={<ManageAgents />} />
      <Route path="/admin/bookings" element={<Bookings />} />

      {/* Agent routes */}
      <Route path="/agent/login" element={<AgentLogin />} />
    <Route path="/agent" element={<Navigate to="/agent/dashboard" />} />
<Route path="/agent/dashboard" element={<AgentDashboard />} />
<Route path="/agent/view-bookings" element={<AgentViewBookings />} />
      
     
    </Routes>
  );
}

export default App;