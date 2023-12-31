const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config({ path: '././config/config.env'});
require('dotenv').config();
//const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password.';
//const SERVER_ERROR_MESSAGE = 'An error occurred during login.';

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log('Received login request:', email);
  
      const user = await User.findOne({ email });
  
      console.log('Found user:', user);
  
      if (!user) {
        console.log('Invalid email');
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      console.log('Password valid:', isPasswordValid);
  
      if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });
  
      console.log('Login successful');
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  };


  var secretKey = process.env.JWT_SECRET_KEY;
  verifyToken = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
      console.log('Access rejected: No token provided.');
      return res.status(400).json({ msg: 'Access rejected: No token provided.' });
    }
    try {
      console.log('Verifying token:', token);
      console.log('Using secret key:', secretKey);
      jwt.verify(token, secretKey);
      console.log('Token verification successful.');
      next();
    } catch (e) {
      console.error('Token verification error:', e);
      res.status(400).json({ msg: 'Token verification error: ' + e.message });
    }
  };


  const decodeToken = async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        console.log('No token provided.');
        return res.status(400).json({ msg: 'No token provided.' });
      }
  
      console.log('Decoding token:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log('Token decoded successfully:', decoded);
  
      const userId = decoded.userId;
      console.log('User ID from token:', userId);
  
      // Assuming your User model is imported correctly
      const user = await User.findById(userId);
  
      if (!user) {
        console.error('User not found.');
        return res.status(404).json({ error: 'User not found.' });
      }
  
      return res.status(200).json({ user });
    } catch (e) {
      console.error('Token decoding error:', e);
      res.status(400).json({ msg: 'Token decoding error: ' + e.message });
    }
  };
  
  
module.exports = {
  login,
  verifyToken,
  decodeToken,
};