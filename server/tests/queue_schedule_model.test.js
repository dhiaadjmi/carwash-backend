

const mongoose = require('mongoose');
const QueueSchedule = require('../models/queue_schedule.model');

require("dotenv").config({ path: "./config/config.env" });

const connectionDB= process.env.STATIONS_DB_ATLAS_URI;  
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

  it('should validate the queue schedule fields', () => {
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
  
    const queueSchedule = new QueueSchedule(validQueueScheduleData);
  
    const validationError = queueSchedule.validateSync();
    expect(validationError).toBeUndefined();
  });


    const queueSchedule = new QueueSchedule(validQueueScheduleData);


    const validationError = queueSchedule.validateSync();
    expect(validationError).toBeUndefined();
  });

  it('should not validate a queue schedule with missing required fields', () => {
    const invalidQueueScheduleData = {
   
    };

    const queueSchedule = new QueueSchedule(invalidQueueScheduleData);


    const validationError = queueSchedule.validateSync();
    expect(validationError).toBeDefined();

  });

  it('should validate the queue schedule fields', () => {
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
  
    const queueSchedule = new QueueSchedule(validQueueScheduleData);
  
    const validationError = queueSchedule.validateSync();
    expect(validationError).toBeUndefined();


  
    const queueSchedule = new QueueSchedule(queueScheduleData);

   
    await queueSchedule.save();

  
    const savedQueueSchedule = await QueueSchedule.findOne({  state: 'ACTIVE',});


    expect(savedQueueSchedule.created_at).toBeDefined();
    expect(savedQueueSchedule.created_at instanceof Date).toBe(true);

});