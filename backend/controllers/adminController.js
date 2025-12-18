const { connectDB, sql } = require("../db");

exports.getAllUsers = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    console.log("Admin: Fetching all bookings...");
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT * FROM Bookings
      ORDER BY bookingDate DESC
    `);
    
    console.log(`Admin: Found ${result.recordset.length} bookings`);
    
    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("Admin: Error fetching bookings:", err);
    res.status(500).json({ 
      error: err.message,
      success: false
    });
  }
};