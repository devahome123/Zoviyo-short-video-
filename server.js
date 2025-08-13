// server.js (UPDATED CODE)

const express = require('express');
const dotenv = require('dotenv');
const pool = require('./db'); // हमारी डेटाबेस कनेक्शन फाइल
const adRoutes = require('./routes/ads');

// --- फंक्शन जो डेटाबेस टेबल बनाएगा ---
const createTables = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE NOT NULL
    );
  `;
  const createVideosTableQuery = `
    CREATE TABLE IF NOT EXISTS Videos (
      id SERIAL PRIMARY KEY,
      video_url TEXT NOT NULL,
      caption TEXT,
      user_id INTEGER REFERENCES Users(id)
    );
  `;
  const createAdConfigTableQuery = `
    CREATE TABLE IF NOT EXISTS Ad_Config (
      id SERIAL PRIMARY KEY,
      ad_location VARCHAR(50) UNIQUE NOT NULL,
      ad_type VARCHAR(50) NOT NULL,
      ad_provider VARCHAR(50) NOT NULL,
      ad_data JSONB NOT NULL,
      is_active BOOLEAN DEFAULT TRUE
    );
  `;

  try {
    await pool.query(createUsersTableQuery);
    await pool.query(createVideosTableQuery);
    await pool.query(createAdConfigTableQuery);
    console.log('Tables are successfully created or already exist.');
  } catch (err) {
    console.error('Error creating tables:', err.stack);
  }
};


// --- सर्वर का बाकी का कोड ---
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Zoviyo Backend is up and running!');
});

app.use('/api/ads', adRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  // सर्वर शुरू होते ही टेबल बनाने वाला फंक्शन चलाओ
  createTables();
});
