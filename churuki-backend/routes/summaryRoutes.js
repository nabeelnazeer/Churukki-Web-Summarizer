const express = require('express');
const { getSummary } = require('../controllers/summaryController');

const router = express.Router();

// Define the route for summarizing content
router.post('/summarize', getSummary);

module.exports = router;
