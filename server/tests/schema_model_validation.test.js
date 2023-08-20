const mongoose = require('mongoose');
const ServiceStation = require('../models/service_station.model');
const Service = require('../models/service.model');
const User = require('../models/user.model'); 

require("dotenv").config({ path: "./config/config.env" });
const connectionDB = process.env.STATIONS_DB_ATLAS_URI; // Replace with your MongoDB connection string
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
  it('should have a valid createdAt timestamp', async () => {
    //-- Create User -----------------------------------------------
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
        email: 'dhia1@gmail.com', // Email valide
        password: '123456'
    };
  
    const user = new User(userData);
    // Sauvegarde l'utilisateur en base de données
    await user.save();
    // Récupère l'utilisateur depuis la base de données
    const savedUser = await User.findOne({ email: 'dhia@gmail.com' });
    //-----------------------------------------------------------------
    //-- Create Service -----------------------------------------------
    const serviceData = {
      name: 'Car Wash',
      state: 'Active',
      is_carwash: true,
    };
    const service = new Service(serviceData);
    // Sauvegarde le service en base de données
    await service.save();
    // Récupère le service depuis la base de données
    const savedService = await Service.findOne({ name: 'Car Wash' });
    //-----------------------------------------------------------------


    
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
          //queue_schedule: '123456',//'queue_schedule_id_1', // Replace with valid QueueSchedule ID
          service: savedService,//.toJSON(), // Replace with valid Service ID
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
    expect(savedServiceStation.createdAt).toBeDefined();
    expect(savedServiceStation.createdAt instanceof Date).toBe(true);
  });
});
