const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../controllers/service.controller');

// API endpoint to create a new service
serviceRouter.post('/create', serviceController.createService);
serviceRouter.get('/list', serviceController.getAllServices);
serviceRouter.get('/:id', serviceController.getServiceById);
serviceRouter.delete('/:id', serviceController.deleteService);
serviceRouter.put('/:id', serviceController.updateService);

module.exports = serviceRouter;