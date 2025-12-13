
/*const { connectDB, sql } = require("../db");
const nodemailer = require("nodemailer");

// Send booking confirmation email
async function sendBookingEmail(toEmail, bookingDetails) {
  let transporter = nodemailer.createTransport({
    service: "Gmail", // or other SMTP service
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "YOUR_APP_PASSWORD" // generate Gmail App password
    }
  });

  let mailOptions = {
    from: '"Cultural Vault" <YOUR_EMAIL@gmail.com>',
    to: toEmail,
    subject: "Tour Booking Confirmation",
    html: `
      <h2>Your booking is confirmed!</h2>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Time:</strong> ${bookingDetails.time}</p>
      <p><strong>Sites:</strong> ${bookingDetails.selectedSites}</p>
      <p><strong>Travel Mode:</strong> ${bookingDetails.travelMode}</p>
      <p><strong>Tour Package:</strong> ${bookingDetails.tourPackage}</p>
      <p><strong>Total Cost:</strong> PKR ${bookingDetails.totalCost}</p>
      <p>Thank you for booking with Cultural Vault!</p>
    `
  };

  await transporter.sendMail(mailOptions);
}

// Create booking
exports.createBooking = async (req, res) => {
  const { name, email, phone, date, time, guests, selectedSites, travelMode, tourPackage, specialRequests, totalCost } = req.body;

  try {
    const pool = await connectDB();

    await pool.request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .input("phone", sql.VarChar, phone)
      .input("date", sql.Date, date)
      .input("time", sql.VarChar, time)
      .input("guests", sql.Int, guests)
      .input("selectedSites", sql.VarChar, selectedSites)
      .input("travelMode", sql.VarChar, travelMode)
      .input("tourPackage", sql.VarChar, tourPackage)
      .input("specialRequests", sql.VarChar, specialRequests || "")
      .input("totalCost", sql.Int, totalCost)
      .query(`
        INSERT INTO Bookings (name, email, phone, date, time, guests, selectedSites, travelMode, tourPackage, specialRequests, totalCost)
        VALUES (@name, @email, @phone, @date, @time, @guests, @selectedSites, @travelMode, @tourPackage, @specialRequests, @totalCost)
      `);

    // Send confirmation email
    await sendBookingEmail(email, { date, time, selectedSites, travelMode, tourPackage, totalCost });

    res.json({ message: "Your tour booking has been confirmed! A confirmation email has been sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};*/

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
      .input("time", sql.NVarChar(10), time)
      .input("guests", sql.Int, guests)
      .input("selectedSites", sql.NVarChar(sql.MAX), selectedSites)
      .input("travelMode", sql.NVarChar(50), travelMode)
      .input("tourPackage", sql.NVarChar(50), tourPackage)
      .input("specialRequests", sql.NVarChar(sql.MAX), specialRequests || "")
      .input("totalCost", sql.Int, totalCost)
      .query(`
        INSERT INTO Bookings (
          name, email, phone, date, time, guests, 
          selectedSites, travelMode, tourPackage, 
          specialRequests, totalCost
        )
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
      success: true
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