const express = require('express');
const serviceRouter = express.Router();
const serviceController = require('../controllers/service.controller');
const authController = require('../controllers/auth.controller'); 

serviceRouter.post('/create',authController.verifyToken, serviceController.createService);
serviceRouter.get('/list',authController.verifyToken, serviceController.getAllServices);
serviceRouter.get('/:id', authController.verifyToken,serviceController.getServiceById);
serviceRouter.delete('/:id', authController.verifyToken,serviceController.deleteService);
serviceRouter.put('/:id',authController.verifyToken, serviceController.updateService);

module.exports = serviceRouter;