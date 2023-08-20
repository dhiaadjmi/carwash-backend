const mongoose = require('mongoose');
const TimeSlot = require('../models/time_slot.model');
const User = require('../models/user.model'); // Import the User model
const QueueSchedule = require('../models/queue_schedule.model'); // Import the QueueSchedule model
require("dotenv").config({ path: "./config/config.env" });

const connectionDB = process.env.STATIONS_DB_ATLAS_URI;

describe('TimeSlot Model', () => {
  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await TimeSlot.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should save a time slot to the database', async () => {
    // Create a User instance and save it
    const userData = {
        name: 'dhia',
        date_of_birth: new Date('1998-07-02'),
        address: {
          street: 'mahdia',
          country: 'tunisia',
          city: 'mahdia',
          postal_code: '5100'
        },
        phone: '54483141',
        profile_photo: 'profile.jpg',
        email: 'dhia2@gmail.com', // Email valide
        password: '123456'
    };
    const user = new User(userData);
    await user.save();

  
    const queueScheduleData = {
        
      };
    const queueSchedule = new QueueSchedule(queueScheduleData);
    await queueSchedule.save();

    const timeSlotData = {
      start_time: new Date(),
      end_time: new Date(),
      user: user._id, 
      state: 'ACTIVE',
      queue_schedule: queueSchedule._id, 
    };

    const timeSlot = new TimeSlot(timeSlotData);
    await timeSlot.save();

    const savedTimeSlot = await TimeSlot.findOne({ _id: timeSlot._id });

    expect(savedTimeSlot).toBeDefined();
    expect(savedTimeSlot.start_time).toEqual(timeSlotData.start_time);
    expect(savedTimeSlot.end_time).toEqual(timeSlotData.end_time);
    expect(savedTimeSlot.user).toEqual(timeSlotData.user);
    expect(savedTimeSlot.state).toEqual(timeSlotData.state);
    expect(savedTimeSlot.queue_schedule).toEqual(timeSlotData.queue_schedule);
    // Add more assertions as needed
  });
});
