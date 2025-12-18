const { connectDB, sql } = require("../db");

/* ================= DASHBOARD ================= */
const getDashboardStats = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT
        (SELECT COUNT(*) FROM Cities) AS cities,
        (SELECT COUNT(*) FROM CulturalSites) AS sites,
        (SELECT COUNT(*) FROM Users) AS users,
        (SELECT COUNT(*) FROM TourGuides) AS guides
    `);
    res.json(result.recordset[0]);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

/* ================= CITIES ================= */
const getCities = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT CityID, CityName, Province, Description, Latitude, Longitude
      FROM Cities ORDER BY CityID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Get cities error:", err);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
};

const addCity = async (req, res) => {
  const { CityName, Province, Description, Latitude, Longitude } = req.body;
  if (!CityName) return res.status(400).json({ message: "CityName is required" });

  try {
    await sql.query`
      INSERT INTO Cities (CityName, Province, Description, Latitude, Longitude)
      VALUES (${CityName}, ${Province}, ${Description}, ${Latitude}, ${Longitude})
    `;
    res.json({ message: "City added successfully" });
  } catch (err) {
    console.error("Add city error:", err);
    res.status(500).json({ message: "Failed to add city" });
  }
};

const editCity = async (req, res) => {
  const { id } = req.params;
  const { CityName, Province, Description, Latitude, Longitude } = req.body;
  if (!CityName) return res.status(400).json({ message: "CityName is required" });

  try {
    await sql.query`
      UPDATE Cities
      SET CityName=${CityName}, Province=${Province}, Description=${Description}, Latitude=${Latitude}, Longitude=${Longitude}
      WHERE CityID=${id}
    `;
    res.json({ message: "City updated successfully" });
  } catch (err) {
    console.error("Edit city error:", err);
    res.status(500).json({ message: "Failed to update city" });
  }
};

const deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM Cities WHERE CityID=${id}`;
    res.json({ message: "City deleted successfully" });
  } catch (err) {
    console.error("Delete city error:", err);
    res.status(500).json({ message: "Failed to delete city" });
  }
};

/* ================= SITES ================= */
const getSites = async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT SiteID, SiteName, CityID, CategoryID, Description, History, Latitude, Longitude, MainImageURL
      FROM CulturalSites ORDER BY SiteID
    `);
    res.json(result.recordset);
  } catch (err) {
    console.error("Get sites error:", err);
    res.status(500).json({ message: "Failed to fetch sites" });
  }
};

const addSite = async (req, res) => {
  const { SiteName, CityID, CategoryID, Description, History, Latitude, Longitude } = req.body;
  if (!SiteName || !CityID || !CategoryID)
    return res.status(400).json({ message: "SiteName, CityID, and CategoryID are required" });

  try {
    const mainImageURL = req.file ? req.file.filename : null;

    await sql.query`
      INSERT INTO CulturalSites 
      (SiteName, CityID, CategoryID, Description, History, Latitude, Longitude, MainImageURL)
      VALUES (${SiteName}, ${CityID}, ${CategoryID}, ${Description}, ${History}, ${Latitude || null}, ${Longitude || null}, ${mainImageURL})
    `;
    res.json({ message: "Site added successfully" });
  } catch (err) {
    console.error("Add site error:", err);
    res.status(500).json({ message: "Failed to add site" });
  }
};

const editSite = async (req, res) => {
  const { id } = req.params;
  const { SiteName, CityID, CategoryID, Description, History, Latitude, Longitude } = req.body;
  if (!SiteName || !CityID || !CategoryID)
    return res.status(400).json({ message: "SiteName, CityID, and CategoryID are required" });

  try {
    const mainImageURL = req.file ? req.file.filename : null;

    if (mainImageURL) {
      await sql.query`
        UPDATE CulturalSites
        SET SiteName=${SiteName}, CityID=${CityID}, CategoryID=${CategoryID}, Description=${Description}, History=${History}, Latitude=${Latitude || null}, Longitude=${Longitude || null}, MainImageURL=${mainImageURL}
        WHERE SiteID=${id}
      `;
    } else {
      await sql.query`
        UPDATE CulturalSites
        SET SiteName=${SiteName}, CityID=${CityID}, CategoryID=${CategoryID}, Description=${Description}, History=${History}, Latitude=${Latitude || null}, Longitude=${Longitude || null}
        WHERE SiteID=${id}
      `;
    }

    res.json({ message: "Site updated successfully" });
  } catch (err) {
    console.error("Edit site error:", err);
    res.status(500).json({ message: "Failed to update site" });
  }
};

const deleteSite = async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM CulturalSites WHERE SiteID=${id}`;
    res.json({ message: "Site deleted successfully" });
  } catch (err) {
    console.error("Delete site error:", err);
    res.status(500).json({ message: "Failed to delete site" });
  }
};

/* ================= AGENTS ================= */
const getAgents = async (req, res) => {
  try {
    const result = await sql.query(`SELECT * FROM TourGuides1 ORDER BY GuideID DESC`);
    res.json(result.recordset);
  } catch (err) {
    console.error("Get agents error:", err);
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};

const addAgent = async (req, res) => {
  const { Fname, Lname, Bio, ExperienceYears, Languages, CNIC, ContactNo } = req.body;

  try {
    await sql.query`
      INSERT INTO TourGuides1
      (Fname, Lname, Bio, ExperienceYears, Languages, CNIC, ContactNo)
      VALUES
      (${Fname}, ${Lname}, ${Bio}, ${ExperienceYears}, ${Languages}, ${CNIC}, ${ContactNo})
    `;
    res.json({ message: "Agent added successfully" });
  } catch (err) {
    console.error("Add agent error:", err);
    res.status(500).json({ message: "Failed to add agent" });
  }
};

const updateAgent = async (req, res) => {
  const { id } = req.params;
  const { Fname, Lname, Bio, ExperienceYears, Languages, CNIC, ContactNo } = req.body;

  try {
    await sql.query`
      UPDATE TourGuides1 SET
        Fname=${Fname},
        Lname=${Lname},
        Bio=${Bio},
        ExperienceYears=${ExperienceYears},
        Languages=${Languages},
        CNIC=${CNIC},
        ContactNo=${ContactNo}
      WHERE GuideID=${id}
    `;
    res.json({ message: "Agent updated successfully" });
  } catch (err) {
    console.error("Update agent error:", err);
    res.status(500).json({ message: "Failed to update agent" });
  }
};

const deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    await sql.query`DELETE FROM TourGuides1 WHERE GuideID=${id}`;
    res.json({ message: "Agent deleted successfully" });
  } catch (err) {
    console.error("Delete agent error:", err);
    res.status(500).json({ message: "Failed to delete agent" });
  }
};

/* ================= USERS & BOOKINGS ================= */
const getAllUsers = async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const result = await sql.query(`SELECT * FROM Bookings ORDER BY bookingDate DESC`);
    res.json({ success: true, count: result.recordset.length, bookings: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= EXPORT ALL ================= */
module.exports = {
  getDashboardStats,
  getCities,
  addCity,
  editCity,
  deleteCity,
  getSites,
  addSite,
  editSite,
  deleteSite,
  getAgents,
  addAgent,
  updateAgent,
  deleteAgent,
  getAllUsers,
  getAllBookings
};
