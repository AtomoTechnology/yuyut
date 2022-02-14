const express = require('express');
const cors = require('cors');
const CatchGlobalError = require('../controllers/errorController');
const appError = require('../helpers/appError');
const app = express();
require('dotenv').config();
require('./../db/relationShip');
const sql = require('./../db/db');

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//router mountain
app.use(require('./routeMountain'));

//start  server
app.listen(port, () => {
  console.log(`app running on port ${port}`);

  //connect to the database
  sql
    .sync({
      // force: true,
      force: false,
      // alter: false,
    })
    .then(() => {
      console.log('db connected...');
    })
    .catch((err) => {
      console.log(err);
    });
});

//any other path
app.use('*', (req, res, next) => {
  next(new appError(`No se pudo encontrar la ruta  : ${req.originalUrl} para este servidor...`, 404));
});

//Global error
app.use(CatchGlobalError);
