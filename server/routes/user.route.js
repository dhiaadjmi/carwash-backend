const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller'); 
const authController = require('../controllers/auth.controller'); 


userRouter.post('/create', userController.createUser);
userRouter.get('/list', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById); 
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);
userRouter.post('/login', authController.login); // Route pour la connexion


module.exports = userRouter;