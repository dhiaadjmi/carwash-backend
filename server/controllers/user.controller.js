const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Contrôleur pour créer un nouvel utilisateur
const createUser = async (req, res) => {
  try {
    const { name, date_of_birth, address, phone, profile_photo, email, password } = req.body;

    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé. Veuillez utiliser une adresse email différente.' });
    }
    // Hasher le mot de passe avant de le sauvegarder dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);
    // Créer une nouvelle instance User avec les données fournies
    const newUser = new User({
      name,
      date_of_birth,
      address: {
        street: address.street,
        country: address.country,
        city: address.city,
        postal_code: address.postal_code,
      },
      phone,
      profile_photo,
      email,
      password: hashedPassword,
    });

    // Sauvegarder les données de l'utilisateur dans la base de données
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find(); 

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while fetching users.' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
