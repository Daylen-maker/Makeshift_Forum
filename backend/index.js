const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 2020;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(`mongodb+srv://vytaslego:${process.env.MONGODB_PASSWORD}@cluster0.ji3drtt.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Routes
app.use('', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
