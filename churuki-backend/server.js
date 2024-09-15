const express = require('express');
const cors = require('cors');
require('dotenv').config();
const summaryRoutes = require('./routes/summaryRoutes');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Use the routes
app.use('/api', summaryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
