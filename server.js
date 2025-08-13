// server.js

const express = require('express');
const dotenv = require('dotenv');
const adRoutes = require('./routes/ads');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Main welcome route
app.get('/', (req, res) => {
  res.send('Zoviyo Backend is up and running!');
});

// Ad configuration route
app.use('/api/ads', adRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
