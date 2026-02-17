const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const mongoose = require('mongoose');
dotenv.config();


require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
app.use(express.json());
connectDB();
};

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/blogs', require('./routes/blogRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));



app.get("/", (req, res) => {
  res.send("Blogging API is running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



