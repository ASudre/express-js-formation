const express = require('express');

const app = express();

const port = 8000;

app.use((req, res, next) => {
  console.log('start of request')
  next();
})

app.get('/', (req, res) => {
  console.log('here')
  res.sendStatus(500);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
