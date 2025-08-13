// routes/ads.js
const express = require('express');
const router = express.Router();
const { getAdConfig } = require('../controllers/adController');

router.get('/config', getAdConfig);

module.exports = router;
