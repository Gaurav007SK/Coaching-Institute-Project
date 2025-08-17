const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/coaching-institute';

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})
