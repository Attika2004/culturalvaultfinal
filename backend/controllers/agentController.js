const { connectDB, sql } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_change_in_production";

// Agent Login
exports.loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("email", sql.NVarChar(255), email)
      .query("SELECT * FROM Agents WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const agent = result.recordset[0];

    // Check if agent is approved
    if (!agent.approved) {
      return res.status(403).json({
        success: false,
        message: "Your account is pending approval"
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, agent.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate token
    const token = jwt.sign(
      { agentID: agent.AgentID, email: agent.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      agent: {
        id: agent.AgentID,
        name: agent.name,
        email: agent.email,
        phone: agent.phone,
        city: agent.city
      }
    });
  } catch (err) {
    console.error("Agent login error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get agent's assigned bookings
exports.getAgentBookings = async (req, res) => {
  const { agentId } = req.params;

  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input("agentId", sql.Int, agentId)
      .query(`
        SELECT * FROM Bookings 
        WHERE agentID = @agentId 
        ORDER BY bookingDate DESC
      `);

    res.json({
      success: true,
      count: result.recordset.length,
      bookings: result.recordset
    });
  } catch (err) {
    console.error("Error fetching agent bookings:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get all agents (for admin)
exports.getAllAgents = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT AgentID, name, email, phone, city, approved, createdAt FROM Agents");

    res.json({
      success: true,
      count: result.recordset.length,
      agents: result.recordset
    });
  } catch (err) {
    console.error("Error fetching agents:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};