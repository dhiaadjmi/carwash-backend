const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Importez le fichier upload.route.js
const uploadRouter = require('../routes/upload.route');
// Contrôleur pour créer un nouvel utilisateur
const createUser = async (req, res) => {
  try {
    const { name, date_of_birth, address, phone, profile_photo, email, password ,role} = req.body;

   

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
      role,
    });
    // Sauvegarder les données de l'utilisateur dans la base de données
    const savedUser = await newUser.save();
     if (req.file) {
      savedUser.profile_photo = req.file.path; 
    }
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
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Utiliser findByIdAndDelete pour rechercher et supprimer l'utilisateur
    const deletedUser = await User.findByIdAndDelete(userId);

    // Vérifier si l'utilisateur a été trouvé et supprimé
    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'utilisateur.' });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour les informations de l'utilisateur
    Object.assign(user, updates);
    await user.save();

    res.status(200).json({ message: 'Informations utilisateur mises à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la mise à jour des informations utilisateur.' });
  }
};




module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
