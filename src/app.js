const express = require('express');
const router = require('./router/players');

const app = express();

app.use(express.json());
app.use('/players', router);

app.use((err, res) => {
    console.log(err);
    res.status(500).send('Something broke');
})

module.exports = app;