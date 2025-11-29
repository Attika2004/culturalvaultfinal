import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CitySelection from "./pages/CitySelection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/city-selection" element={<CitySelection />} />
    </Routes>
  );
}

export default App;
