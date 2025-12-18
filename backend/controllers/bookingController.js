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
      success: false,
      error: "Please fill all required fields" 
    });
  }

  try {
    console.log("→ Connecting to database...");
    const pool = await connectDB();
    console.log("✓ Database connected");

    console.log("→ Inserting booking...");
    
    const bookingTime = time || "09:00 AM";
    
    const result = await pool.request()
      .input("name", sql.NVarChar(100), name)
      .input("email", sql.NVarChar(255), email)
      .input("phone", sql.NVarChar(20), phone)
      .input("date", sql.Date, new Date(date))
      .input("time", sql.NVarChar(50), String(bookingTime))
      .input("guests", sql.Int, parseInt(guests) || 1)
      .input("selectedSites", sql.NVarChar(sql.MAX), selectedSites)
      .input("travelMode", sql.NVarChar(50), travelMode || "car")
      .input("tourPackage", sql.NVarChar(50), tourPackage || "standard")
      .input("specialRequests", sql.NVarChar(sql.MAX), specialRequests || "")
      .input("totalCost", sql.Int, parseInt(totalCost) || 0)
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
      success: false,
      error: "Failed to create booking. Please try again.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  console.log("\n=== FETCHING ALL BOOKINGS ===");
  
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT * FROM Bookings 
      ORDER BY bookingDate DESC
    `);
    
    console.log(`✓ Found ${result.recordset.length} bookings`);
    
    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch bookings",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get bookings by email
exports.getBookingsByEmail = async (req, res) => {
  const { email } = req.params;
  
  console.log(`\n=== FETCHING BOOKINGS FOR: ${email} ===`);
  
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query(`
        SELECT * FROM Bookings 
        WHERE email = @email 
        ORDER BY bookingDate DESC
      `);
    
    console.log(`✓ Found ${result.recordset.length} bookings for ${email}`);
    
    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("❌ Error fetching bookings by email:", err);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch bookings",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Get single booking by ID
exports.getBookingById = async (req, res) => {
  const { id } = req.params;
  
  console.log(`\n=== FETCHING BOOKING ID: ${id} ===`);
  
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT * FROM Bookings 
        WHERE BookingID = @id
      `);
    
    if (result.recordset.length === 0) {
      console.log(`✗ Booking ${id} not found`);
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }
    
    console.log(`✓ Found booking ${id}`);
    
    res.json({
      success: true,
      booking: result.recordset[0]
    });
  } catch (err) {
    console.error("❌ Error fetching booking:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch booking",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  console.log(`\n=== UPDATING BOOKING ${id} STATUS TO: ${status} ===`);

  if (!status) {
    return res.status(400).json({
      success: false,
      error: "Status is required"
    });
  }

  const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
    });
  }

  try {
    const pool = await connectDB();
    
    const checkResult = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT BookingID FROM Bookings WHERE BookingID = @id");
    
    if (checkResult.recordset.length === 0) {
      console.log(`✗ Booking ${id} not found`);
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    await pool.request()
      .input("id", sql.Int, id)
      .input("status", sql.NVarChar(50), status)
      .query(`
        UPDATE Bookings 
        SET status = @status
        WHERE BookingID = @id
      `);

    console.log(`✓ Booking ${id} status updated to ${status}`);

    res.json({
      success: true,
      message: `Booking status updated to ${status} successfully`
    });
  } catch (err) {
    console.error("❌ Error updating booking:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update booking status",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  console.log(`\n=== DELETING BOOKING ${id} ===`);

  try {
    const pool = await connectDB();
    
    const checkResult = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT BookingID FROM Bookings WHERE BookingID = @id");
    
    if (checkResult.recordset.length === 0) {
      console.log(`✗ Booking ${id} not found`);
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Bookings 
        WHERE BookingID = @id
      `);

    console.log(`✓ Booking ${id} deleted successfully`);

    res.json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (err) {
    console.error("❌ Error deleting booking:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete booking",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};