import express, { Request, Response, NextFunction } from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController';

const router = express.Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser);

export default router;
