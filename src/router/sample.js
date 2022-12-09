const express = require('express');

const toto = require('../middlewares/toto');
const { insertInDb, findInDb } = require('../services/mongodb');

const router = express.Router();

router.get('/', toto, async (req, res) => {
  const fruits = await findInDb();
  res.send({
    body: fruits,
  });
});

router.post('/', async (req, res) => {
  console.log('my post request');
  const fruit = {
    name: 'orange',
    color: 'orange'
  }
  await insertInDb(fruit)
  res.sendStatus(200);
});

router.delete('/', (req, res) => {
  console.log('my delete request');
  res.sendStatus(200);
});

router.patch('/', (req, res) => {
  console.log('my patch request');
  res.sendStatus(200);
});

module.exports = router;
