const express = require('express');
const app = express();
require('dotenv').config();

require('./../db/relationShip');

const sql = require('./../db/db');

const port = process.env.PORT || 5000;

//router mountain

app.use('/api/v1/roles', require('../routes/rolesRoute'));

app.listen(port, () => {
  console.log(`app running on port ${port}`);
  sql
    .sync({
      force: false,
    })
    .then(() => {
      console.log('db connected...');
    })
    .catch((err) => {
      console.log(err);
    });
});
