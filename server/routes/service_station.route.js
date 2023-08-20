const express = require('express');
const service_stationRouter = express.Router();
const serviceStationController = require('../controllers/service_station.controller');
const authController = require('../controllers/auth.controller'); 


service_stationRouter.post('/create', authController.verifyToken,serviceStationController.createServiceStation);
service_stationRouter.get('/list',authController.verifyToken,serviceStationController.getAllServiceStations);
service_stationRouter.get('/:id',authController.verifyToken,serviceStationController.getServiceStationById);
service_stationRouter.delete('/:id',authController.verifyToken,serviceStationController.deleteServiceStation);
service_stationRouter.put('/:id', authController.verifyToken,serviceStationController.updateServiceStation);

module.exports = service_stationRouter;