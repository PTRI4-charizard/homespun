import express, { Request, Response, NextFunction } from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController';
import { login } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser);

export default router;
