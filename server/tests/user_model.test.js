
/*
const mongoose = require('mongoose'); 

const User = require('../models/user.model');
const { isEmail } = require('validator');

require("dotenv").config({ path: "./config/config.env" });

const connectionDB= process.env.STATIONS_DB_ATLAS_URI; 

describe('User Model', () => {

  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });


   beforeEach(async () => {
    await User.deleteMany({});
  });



  afterAll(async () => {
    await mongoose.disconnect();
  });


    // Teste la validation de l'email
    it('should validate the email field', () => {
      const validUserData = {
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
        email: 'dhia@gmail.com', // Email valide
        password: '123456'
      };

      const user = new User(validUserData);
  

      const validationError = user.validateSync();
      expect(validationError).toBeUndefined();
    });
  
 
    it('should not validate an invalid email address', () => {
      const invalidUserData = {
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
        email: 'invalid-email',
        password: '123456'
      };
  
      // Crée une instance de l'utilisateur avec les données invalides
      const user = new User(invalidUserData);
  
      // Vérifie que la validation de l'email échoue
      const validationError = user.validateSync();
      expect(validationError.errors.email.message).toBe('Please enter a valid email address.');
    });
  
// Teste que la date de création est correctement définie
it('should have a valid createdAt timestamp', async () => {
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
        email: 'dhia@gmail.com', // Email valide
        password: '123456'
    };
  
    const user = new User(userData);

    // Sauvegarde l'utilisateur en base de données
    await user.save();

    // Récupère l'utilisateur depuis la base de données
    const savedUser = await User.findOne({ email: 'dhia@gmail.com' });

    // Vérifie que la date de création est définie
    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.createdAt instanceof Date).toBe(true);

  });
  

  });


  */

/** 

  //test in memory store 

  const User = require('../models/user.model');
const { isEmail } = require('validator');


describe('User Model', () => {
    // Teste la validation de l'email
    it('should validate the email field', () => {
      const validUserData = {
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
        email: 'dhia@gmail.com', // Email valide
        password: '123456'
      };
  
      // Crée une instance de l'utilisateur avec les données valides
      const user = new User(validUserData);
  
      // Vérifie que la validation de l'email passe
      const validationError = user.validateSync();
      expect(validationError).toBeUndefined();
    });
  
    // Teste la validation de l'email invalide
    it('should not validate an invalid email address', () => {
      const invalidUserData = {
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
        email: 'invalid-email',
        password: '123456'
      };
  
      // Crée une instance de l'utilisateur avec les données invalides
      const user = new User(invalidUserData);
  
      // Vérifie que la validation de l'email échoue
      const validationError = user.validateSync();
      expect(validationError.errors.email.message).toBe('Please enter a valid email address.');
    });
  
// Teste que la date de création est correctement définie
it('should have a valid createdAt timestamp', async () => {
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
        email: 'dhia@gmail.com', // Email valide
        password: '123456'
    };
  
    const user = new User(userData);

    // Sauvegarde l'utilisateur en base de données
    await user.save();

    // Récupère l'utilisateur depuis la base de données
    const savedUser = await User.findOne({ email: 'dhia@gmail.com' });

    // Vérifie que la date de création est définie
   expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.createdAt instanceof Date).toBe(true);  
  });
  

  });
*/