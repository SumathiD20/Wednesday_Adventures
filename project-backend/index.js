// Import and initialize Datadog APM
const tracer = require('dd-trace').init({
    service: "project-backend",  // Matches the DD_SERVICE in Dockerfile
    env: process.env.DD_ENV || "production",
    logInjection: true,          // Inject logs into Datadog
    analytics: true              // Enable trace analytics
});

// Other imports
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerConfig = require('./swagger');

const app = express();

dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 5000;

// MongoDB connection
require('./db/connection');

// CORS configuration
app.use(cors({origin: '*'}));
app.use(cookieParser());
app.use(bodyParser.json());
swaggerConfig(app);

// Routes
app.use(require('./routes/auth'));
app.use(require('./routes/adminauth'));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Wednesdays Wicked Adventures theme park!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
