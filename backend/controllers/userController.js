const { sql, connectDB } = require('../db');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('UserID', sql.Int, req.user.userID)
      .query('SELECT FirstName, LastName, Email, Phone FROM Users WHERE UserID=@UserID');

    if (result.recordset.length === 0)
      return res.status(404).json({ error: 'User not found' });

    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  try {
    const pool = await connectDB();
    await pool.request()
      .input('UserID', sql.Int, req.user.userID)
      .input('FirstName', sql.VarChar, firstName)
      .input('LastName', sql.VarChar, lastName)
      .input('Phone', sql.VarChar, phone)
      .query(`
        UPDATE Users
        SET FirstName=@FirstName, LastName=@LastName, Phone=@Phone
        WHERE UserID=@UserID
      `);

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};
