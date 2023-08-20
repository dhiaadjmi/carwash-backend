const mongoose = require('mongoose');
const QueueSchedule = require('../models/queue_schedule.model');

const createQueueSchedule = async (req, res) => {
  try {
    const { time_slots } = req.body;

    const newQueueSchedule = new QueueSchedule({
      time_slots,
    });

    const savedQueueSchedule = await newQueueSchedule.save();
    res.status(201).json(savedQueueSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllQueueSchedules = async (req, res) => {
    try {
      const queueSchedules = await QueueSchedule.find();
      res.status(200).json(queueSchedules);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching queue schedules.' });
    }
  };
  const getQueueScheduleById = async (req, res) => {
    try {
      const queueSchedule = await QueueSchedule.findById(req.params.id);
      if (!queueSchedule) {
        return res.status(404).json({ error: 'Queue schedule not found.' });
      }
      res.status(200).json(queueSchedule);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the queue schedule.' });
    }
  };


const deleteQueueSchedule = async (req, res) => {
  try {
    const deletedQueueSchedule = await QueueSchedule.findByIdAndDelete(req.params.id);
    if (!deletedQueueSchedule) {
      return res.status(404).json({ error: 'Queue schedule not found.' });
    }
    res.status(200).json({ message: 'Queue schedule deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the queue schedule.' });
  }
};

const updateQueueSchedule = async (req, res) => {
  try {
    const updatedQueueSchedule = await QueueSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedQueueSchedule) {
      return res.status(404).json({ error: 'Queue schedule not found.' });
    }
    res.status(200).json(updatedQueueSchedule);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the queue schedule.' });
  }
};
module.exports = {
  createQueueSchedule,
  getAllQueueSchedules,
  getQueueScheduleById,
  deleteQueueSchedule,
  updateQueueSchedule,
  
};
