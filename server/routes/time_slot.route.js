const express = require('express');
const timeSlotRouter = express.Router();
const timeSlotController = require('../controllers/time_slot.controller');

//const authController = require('../controllers/auth.controller');
// router.use(authController.verifyToken);


timeSlotRouter.post('/create', timeSlotController.createTimeSlot);

timeSlotRouter.get('/list', timeSlotController.getAllTimeSlots);

timeSlotRouter.get('/:id', timeSlotController.getTimeSlotById);

timeSlotRouter.delete('/:id', timeSlotController.deleteTimeSlot);

timeSlotRouter.put('/:id', timeSlotController.updateTimeSlot);
module.exports = timeSlotRouter;