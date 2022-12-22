const express = require('express');
require('express-async-errors');
const router = require('./api/players');

const app = express();

app.use(express.json());
app.use('/players', router);

app.use((err, req, res, next) => {
  res.status(err.statusCode).send(err.message);
})

module.exports = app;