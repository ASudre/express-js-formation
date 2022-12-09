const express = require('express');

const sampleRouter = require('./router/sample')

const app = express();

app.use((req, res, next) => {
  console.log('start of request')
  next();
})

app.use('/sample', sampleRouter);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

module.exports = app;
