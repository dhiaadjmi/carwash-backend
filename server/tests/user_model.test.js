
const mongoose = require('mongoose'); // Add this line to require mongoose

const User = require('../models/user.model');
const { isEmail } = require('validator');
const connectionDB= 'mongodb+srv://dhiaadjmi:UXXqcAxLyj6Bzvph@dhiaadjmi.n27nqpy.mongodb.net/?retryWrites=true&w=majority';
describe('User Model', () => {
  // Establish the database connection before running the tests
  beforeAll(async () => {
    await mongoose.connect(connectionDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });


   // Clean up the database before each test
   beforeEach(async () => {
    await User.deleteMany({});
  });



  // Close the database connection after running all the tests
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
    expect(savedUser.created_at).toBeDefined();
    expect(savedUser.created_at instanceof Date).toBe(true);

  });
  

  });

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
    expect(savedUser.created_at).toBeDefined();
    expect(savedUser.created_at instanceof Date).toBe(true);
  });
  

  });
*/