import express from 'express';

import {registerUser, loginUser, loginAdmin} from '../controller/userController.js' 

const userRouter =express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.post('/admin',loginAdmin);

export default userRouter;
