import express from 'express';
import passport from 'passport';

const router = express.Router()


import { signUp,login } from '../controllers/userController';

router.post('/signup',signUp);
router.post('/login',login);


export default router;