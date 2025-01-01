const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
const protocol = process.env.PROTOCOL || 'http';
const domain = process.env.DOMAIN || 'localhost';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server running at ${protocol}://${domain}:${port} in ${process.env.NODE_ENV} mode`);
});