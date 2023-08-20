const TimeSlot = require('../models/time_slot.model');

// Controller to create a new time slot
const createTimeSlot = async (req, res) => {
  try {
    const { start_time, end_time, user, state, queue_schedule } = req.body;
    
    // Create a new instance of TimeSlot
    const newTimeSlot = new TimeSlot({
      start_time,
      end_time,
      user,
      state,
      queue_schedule,
    });

    // Save the new time slot to the database
    const savedTimeSlot = await newTimeSlot.save();

    res.status(201).json(savedTimeSlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllTimeSlots = async (req, res) => {
    try {
      const timeSlots = await TimeSlot.find();
      res.status(200).json(timeSlots);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching time slots.' });
    }
  };
  
  const getTimeSlotById = async (req, res) => {
    try {
      const timeSlot = await TimeSlot.findById(req.params.id);
      if (!timeSlot) {
        return res.status(404).json({ error: 'Time slot not found.' });
      }
      res.status(200).json(timeSlot);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the time slot.' });
    }
  };
  
  const deleteTimeSlot = async (req, res) => {
    try {
      const deletedTimeSlot = await TimeSlot.findByIdAndDelete(req.params.id);
      if (!deletedTimeSlot) {
        return res.status(404).json({ error: 'Time slot not found.' });
      }
      res.status(200).json({ message: 'Time slot deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the time slot.' });
    }
  };
  
  const updateTimeSlot = async (req, res) => {
    try {
      const updatedTimeSlot = await TimeSlot.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTimeSlot) {
        return res.status(404).json({ error: 'Time slot not found.' });
      }
      res.status(200).json(updatedTimeSlot);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the time slot.' });
    }
  };

  module.exports = {
    createTimeSlot,
    getAllTimeSlots,
    getTimeSlotById,
    deleteTimeSlot,
    updateTimeSlot,
  };
