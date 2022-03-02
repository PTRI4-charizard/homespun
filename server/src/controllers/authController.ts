import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';
import { client } from '../elephantsql';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // 1) Check if email and password were provided
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check id user exists && if the password is correct
    const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.passwordhash))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    return res.status(200).json({
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};
