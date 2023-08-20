const express = require('express');
const queueRouter = express.Router();
const authController = require('../controllers/auth.controller');
const queueScheduleController = require('../controllers/queue_schedule.controller');

// Create a new QueueSchedule (Requires token verification)
queueRouter.post('/create',  queueScheduleController.createQueueSchedule);
queueRouter.get('/list',  queueScheduleController.createQueueSchedule);
queueRouter.get('/:id', queueScheduleController.getQueueScheduleById);

queueRouter.delete('/:id', queueScheduleController.deleteQueueSchedule);

queueRouter.put('/:id', queueScheduleController.updateQueueSchedule);

module.exports = queueRouter;