
const mongoose = require('mongoose');
const Service = require('../models/service.model');
const QueueSchedule = require('../models/queue_schedule.model');
require("dotenv").config({ path: "./config/config.env" });

const connectionDB = process.env.STATIONS_DB_ATLAS_URI;
// ... other imports and configurations

describe('QueueSchedule Model', () => {
  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await QueueSchedule.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should save a queue schedule to the database', async () => {
    console.log('Starting test');

    
    console.log('Creating QueueSchedule');
    const queueSchedule = new QueueSchedule();
    await queueSchedule.save();

    const timeSlotData = {
      start_time: new Date(),
      end_time: new Date(),
      user: '64d4db6fd68ef3c9ad5d71e3',
      state: 'ACTIVE',
      queue_schedule: queueSchedule._id,
    };

    console.log('Creating time slot data:', timeSlotData);


  it('should validate the queue schedule fields', async () => {
    const validQueueScheduleData = {
      time_slots: [
        {
          start_time: new Date('2023-08-01T09:00:00Z'),
          end_time: new Date('2023-08-01T10:00:00Z'),
          user: '64d4d29c0baa44b90394b1f2',
          state: 'ACTIVE',
          queue_schedule: 'placeholder_id_1', 
        },
        {
          start_time: new Date('2023-08-01T10:00:00Z'),
          end_time: new Date('2023-08-01T11:00:00Z'),
          user: '64d4d29c0baa44b90394b1f2',
          state: 'ACTIVE',
          queue_schedule: 'placeholder_id_2', 
        },
      ],
    };

    const newQueueSchedule = new QueueSchedule(queueScheduleData);
    await newQueueSchedule.save();

    console.log('Saved new QueueSchedule:', newQueueSchedule);

    const savedQueueSchedule = await QueueSchedule.findOne({ _id: newQueueSchedule._id });

    console.log('Retrieved saved QueueSchedule:', savedQueueSchedule);
  });
});
