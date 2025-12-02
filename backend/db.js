const sql = require('mssql');

const config = {
    user: 'sa',                // your SQL username
    password: '1234567',       // your SQL password
    server: 'localhost',       // keep localhost
    port: 1433,                // SQL Server port
    database: 'culturalvault', // your new project database
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("Connected to SQL Server");
        return pool;
    } catch (err) {
        console.error("Database Connection Failed: ", err);
    }
}

module.exports = { connectDB, sql };
