const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const citiesRoutes = require('./routes/citiesRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const siteRoutes = require('./routes/siteRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const eventRoutes = require('./routes/eventRoutes');
const guideRoutes = require('./routes/guideRoutes');
const travelPackageRoutes = require('./routes/travelPackageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const agentRoutes = require('./routes/agentRoutes');

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// JSON
app.use(express.json());

// Static uploads
app.use("/uploads", express.static("uploads"));

// Connect to DB
connectDB().then(() => console.log("DB connected")).catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cities', citiesRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/travel-packages', travelPackageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agents', agentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
