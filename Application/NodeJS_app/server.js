const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3000;

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Dockerized Node.js app with MongoDB!');
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:${port}');
});  