import express from 'express';
import { loginValidation, signupValidation } from '../middlwares/authMiddlewares.js';
import { login, signup } from '../Controllers/authController.js';

const router = express.Router()

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

export default router