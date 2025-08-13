// controllers/adController.js
const pool = require('../db'); // डेटाबेस कनेक्शन

const getAdConfig = async (req, res) => {
  try {
    const adConfigQuery = await pool.query('SELECT * FROM Ad_Config WHERE is_active = TRUE');
    res.json(adConfigQuery.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getAdConfig
};
