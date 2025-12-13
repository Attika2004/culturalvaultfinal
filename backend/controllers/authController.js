const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectDB, sql } = require("../db");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const pool = await connectDB();

        // check if exists
        const check = await pool.request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM Users WHERE email = @email");

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        await pool.request()
            .input("name", sql.VarChar, name)
            .input("email", sql.VarChar, email)
            .input("password", sql.VarChar, hashed)
            .query("INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)");

        res.json({ message: "Registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await connectDB();

        const user = await pool.request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM Users WHERE email = @email");

        if (user.recordset.length === 0)
            return res.status(400).json({ message: "Invalid email or password" });

        const valid = await bcrypt.compare(password, user.recordset[0].password);
        if (!valid)
            return res.status(400).json({ message: "Invalid email or password" });

        res.json({
            message: "Login successful",
            user: user.recordset[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
