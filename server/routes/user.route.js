const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller'); 
const authController = require('../controllers/auth.controller'); 

userRouter.post('/create',authController.verifyToken, userController.createUser);
//userRouter.post('/create',userController.createUser);
userRouter.get('/list',authController.verifyToken,userController.getAllUsers);
userRouter.get('/:id',authController.verifyToken,userController.getUserById); 
userRouter.delete('/:id',authController.verifyToken, userController.deleteUser);
userRouter.put('/:id',authController.verifyToken, userController.updateUser);
userRouter.post('/login', authController.login); // Route pour la connexion


module.exports = userRouter;