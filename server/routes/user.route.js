const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller'); 
const authController = require('../controllers/auth.controller'); 




//userRouter.post('/create',authController.verifyToken, userController.createUser);
userRouter.post('/create',userController.createUser);
userRouter.get('/list',userController.getAllUsers);
userRouter.get('/:id',userController.getUserById); 
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:id', userController.updateUser);
userRouter.post('/login', authController.login); 

userRouter.get('/decode', authController.verifyToken, authController.decodeToken);

module.exports = userRouter;