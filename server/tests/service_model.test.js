const mongoose = require('mongoose');
const Service = require('../models/service.model');

require("dotenv").config({ path: "./config/config.env" });

const connectionDB= process.env.STATIONS_DB_ATLAS_URI;

describe('Service Model', () => {

  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await Service.deleteMany({});
  });

  // Close the database connection after running all the tests
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should validate the service fields', () => {
    const validServiceData = {
      name: 'Car Wash',
      state: 'Active',
      is_carwash: true,
    };

    const service = new Service(validServiceData);

    // Vérifie que la validation des champs du service passe
    const validationError = service.validateSync();
    expect(validationError).toBeUndefined();
  });

  it('should not validate a service with missing required fields', () => {
    const invalidServiceData = {

    };

    const service = new Service(invalidServiceData);

    // Vérifie que la validation du service échoue en raison de champs manquants
    const validationError = service.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError.errors.name).toBeDefined();
    expect(validationError.errors.state).toBeDefined();
    expect(validationError.errors.is_carwash).toBeDefined();
  });

  it('should have a valid createdAt timestamp', async () => {
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

    // Vérifie que la date de création est définie
    expect(savedService.created_at).toBeDefined();
    expect(savedService.created_at instanceof Date).toBe(true);
  });
});