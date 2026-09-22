const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/courseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health Check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running'
  });
});

// Course Routes
app.use('/api/courses', routes);

// Start Server
app.get('/', (req, res) => {
    res.send('RougeFeed: Server is running');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is listening at ${PORT}`);
});

connectDB();