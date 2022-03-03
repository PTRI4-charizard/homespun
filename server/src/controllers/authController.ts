import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
import AppError from '../utils/appError';
import { client } from '../elephantsql';
import { runInNewContext } from 'vm';

interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}

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

    // 3) If everything is okay, send the token
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET || '');
    const cookieOptions: CookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.passwordhash = undefined;

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  // Get the token and check if it's there
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access', 401));
  }

  // Verify token
  let currentUser = jwt.verify(token, process.env.JWT_SECRET || '', async (decoded: any) => {
    const result = await client.query('SELECT * FROM users WHERE user_id = $1', [decoded.id]);
    return result.rows[0];
  });

  // GRANT ACCESS TO PROTECTED ROUTE
  res.locals.user = currentUser;
  next();
};
