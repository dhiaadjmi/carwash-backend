const mongoose = require('mongoose');
const ServiceStation = require('../models/service_station.model');
const User = require('../models/user.model'); 

const connectionDB = 'mongodb://your-mongodb-connection-string'; // Replace with your MongoDB connection string

describe('ServiceStation Model', () => {

  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await ServiceStation.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should validate the service station fields', () => {
    const validServiceStationData = {
      name: 'Sample Service Station',
      phones: {
        phone1: '1234567890',
        phone2: '9876543210',
      },
      email: 'sample@example.com',
      photos: [
        { path: 'path1.jpg', order: '1' },
        { path: 'path2.jpg', order: '2' },
      ],
      profile_photo: 'profile.jpg',
      managers: ['manager_id_1', 'manager_id_2'], // Replace with valid User IDs
      queues: [
        {
          name: 'Queue 1',
          queue_schedule: 'queue_schedule_id_1', // Replace with valid QueueSchedule ID
          service: 'service_id_1', // Replace with valid Service ID
        },
      ],
      state: 'ACTIVE',
    };

    const serviceStation = new ServiceStation(validServiceStationData);

    // Verify that the validation of the service station passes
    const validationError = serviceStation.validateSync();
    expect(validationError).toBeUndefined();
  });

  it('should not validate a service station with missing required fields', () => {
    const invalidServiceStationData = {
      // Missing required fields here
      // ...
    };

    const serviceStation = new ServiceStation(invalidServiceStationData);

    // Verify that the validation of the service station fails due to missing required fields
    const validationError = serviceStation.validateSync();
    expect(validationError).toBeDefined();
    // Add expect statements for each missing required field
    // ...
  });

  it('should have a valid createdAt timestamp', async () => {
    const serviceStationData = {
      name: 'Sample Service Station',
      phones: {
        phone1: '1234567890',
        phone2: '9876543210',
      },
      email: 'sample@example.com',
      photos: [
        { path: 'path1.jpg', order: '1' },
        { path: 'path2.jpg', order: '2' },
      ],
      profile_photo: 'profile.jpg',
      managers: ['manager_id_1', 'manager_id_2'], // Replace with valid User IDs
      queues: [
        {
          name: 'Queue 1',
          queue_schedule: 'queue_schedule_id_1', // Replace with valid QueueSchedule ID
          service: 'service_id_1', // Replace with valid Service ID
        },
      ],
      state: 'ACTIVE',
    };

    const serviceStation = new ServiceStation(serviceStationData);

    // Save the service station to the database
    await serviceStation.save();

    // Retrieve the service station from the database
    const savedServiceStation = await ServiceStation.findOne({ name: 'Sample Service Station' });

    // Verify that the createdAt timestamp is defined and is an instance of Date
    expect(savedServiceStation.created_at).toBeDefined();
    expect(savedServiceStation.created_at instanceof Date).toBe(true);
  });
});
