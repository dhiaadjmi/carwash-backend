const express = require('express');
const service_stationRouter = express.Router();
const serviceStationController = require('../controllers/service_station.controller');


service_stationRouter.post('/create', serviceStationController.createServiceStation);

module.exports = service_stationRouter;