const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const indexRoutes = require('./src/routes/index');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const protocol = process.env.PROTOCOL || 'http';
const domain = process.env.DOMAIN || 'localhost';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/api', indexRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(port, () => {
  console.log(`Server running at ${protocol}://${domain}:${port} in ${process.env.NODE_ENV} mode`);
});