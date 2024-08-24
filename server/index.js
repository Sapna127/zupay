const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/v1/test', (req, res) => {
    res.send('Test route works!');
});

// Blog Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/v1/blogs', blogRoutes);

//user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes);

//search routes
// const searchRoutes = require('./routes/searchRoutes');
// app.use('/api/v1/blogs', searchRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
