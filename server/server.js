const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: false }));
const isochroneController = require('./isochroneController');
const googleMapsController = require('./googleMapsController');
const centroidController = require('./centroidController');
const yelpController = require('./yelpController');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
// statically serve everything in the build folder on the route '/build'
app.use(express.static(path.join(__dirname, '../build')));

// routes here
app.post(
  '/api/buildroute',
  isochroneController.getCoords,
  isochroneController.generateRoutes,
  isochroneController.generateIsochrones,
  centroidController.getCentroid,
  yelpController.getNearby,
  googleMapsController.genGoogleMapsURL,
  yelpController.getRadius,
  (req, res) => {
    console.log('res.locals @ end of middleware chain', res.locals);
    res.status(200).json(res.locals);
  }
);

// serve index.html on the route '/'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(process.env.PORT || 3000); //listens on port 3000 -> http://localhost:3000/
console.log('this works, at least !');
