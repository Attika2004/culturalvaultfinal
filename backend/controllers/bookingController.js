const { connectDB, sql } = require("../db");

// Create booking
exports.createBooking = async (req, res) => {
  console.log("\n=== NEW BOOKING REQUEST ===");
  console.log("Body received:", JSON.stringify(req.body, null, 2));

  const { 
    name, 
    email, 
    phone, 
    date, 
    time, 
    guests, 
    selectedSites, 
    travelMode, 
    tourPackage, 
    specialRequests, 
    totalCost 
  } = req.body;

  // Validation
  if (!name || !email || !phone || !date || !selectedSites) {
    console.log("✗ Validation failed - missing required fields");
    return res.status(400).json({ 
      error: "Please fill all required fields" 
    });
  }

  try {
    console.log("→ Connecting to database...");
    const pool = await connectDB();
    console.log("✓ Database connected");

    console.log("→ Inserting booking...");
    const result = await pool.request()
      .input("name", sql.NVarChar(100), name)
      .input("email", sql.NVarChar(255), email)
      .input("phone", sql.NVarChar(20), phone)
      .input("date", sql.Date, date)
      .input("time", sql.NVarChar(10), time || "09:00")
      .input("guests", sql.Int, guests || 1)
      .input("selectedSites", sql.NVarChar(sql.MAX), selectedSites)
      .input("travelMode", sql.NVarChar(50), travelMode || "car")
      .input("tourPackage", sql.NVarChar(50), tourPackage || "standard")
      .input("specialRequests", sql.NVarChar(sql.MAX), specialRequests || "")
      .input("totalCost", sql.Int, totalCost)
      .query(`
        INSERT INTO Bookings (
          name, email, phone, date, time, guests, 
          selectedSites, travelMode, tourPackage, 
          specialRequests, totalCost
        )
        OUTPUT INSERTED.*
        VALUES (
          @name, @email, @phone, @date, @time, @guests,
          @selectedSites, @travelMode, @tourPackage,
          @specialRequests, @totalCost
        )
      `);

    console.log("✓ Booking saved successfully!");
    console.log("=== REQUEST COMPLETED ===\n");

    res.status(200).json({ 
      message: "Thank you! Your tour booking has been confirmed successfully!",
      success: true,
      booking: result.recordset[0]
    });

  } catch (err) {
    console.error("\n=== ERROR OCCURRED ===");
    console.error("Type:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    
    if (err.precedingErrors) {
      console.error("Preceding errors:", err.precedingErrors);
    }
    
    console.error("=== ERROR END ===\n");
    
    res.status(500).json({ 
      error: "Failed to create booking. Please try again.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT * FROM Bookings 
      ORDER BY bookingDate DESC
    `);
    
    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ 
      error: "Failed to fetch bookings",
      success: false
    });
  }
};

// Get bookings by email
exports.getBookingsByEmail = async (req, res) => {
  const { email } = req.params;
  
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query(`
        SELECT * FROM Bookings 
        WHERE email = @email 
        ORDER BY bookingDate DESC
      `);
    
    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ 
      error: "Failed to fetch bookings",
      success: false
    });
  }
};