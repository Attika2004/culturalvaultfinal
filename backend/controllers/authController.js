const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB, sql } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key_change_in_production";

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const pool = await connectDB();

        // Check if user exists
        const check = await pool.request()
            .input("email", sql.VarChar(255), email)
            .query("SELECT * FROM Users WHERE Email = @email");

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        // Split name into FirstName and LastName
        const nameParts = name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || firstName;

        // Insert user and return the new user
        const result = await pool.request()
            .input("firstName", sql.VarChar(100), firstName)
            .input("lastName", sql.VarChar(100), lastName)
            .input("email", sql.VarChar(255), email)
            .input("password", sql.VarChar(255), hashed)
            .query(`
                INSERT INTO Users (FirstName, LastName, Email, PasswordHash) 
                OUTPUT INSERTED.UserID, INSERTED.FirstName, INSERTED.LastName, INSERTED.Email
                VALUES (@firstName, @lastName, @email, @password)
            `);

        const newUser = result.recordset[0];

        // Generate token
        const token = jwt.sign(
            { userID: newUser.UserID, email: newUser.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ 
            message: "Registered successfully",
            token,
            user: {
                id: newUser.UserID,
                name: `${newUser.FirstName} ${newUser.LastName}`.trim(),
                email: newUser.Email
            }
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await connectDB();

        const user = await pool.request()
            .input("email", sql.VarChar(255), email)
            .query("SELECT * FROM Users WHERE Email = @email");

        if (user.recordset.length === 0)
            return res.status(400).json({ message: "Invalid email or password" });

        const userData = user.recordset[0];
        const valid = await bcrypt.compare(password, userData.PasswordHash);
        
        if (!valid)
            return res.status(400).json({ message: "Invalid email or password" });

        // Generate token
        const token = jwt.sign(
            { userID: userData.UserID, email: userData.Email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: userData.UserID,
                name: `${userData.FirstName} ${userData.LastName}`.trim(),
                email: userData.Email
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: err.message });
    }
};