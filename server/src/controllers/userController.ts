import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { client } from '../elephantsql';

type Middleware = (req: Request, res: Response, next: NextFunction) => {};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  skills: string[];
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await client.query(
      'SELECT user_id, firstName, lastName, email FROM users ORDER BY user_id ASC',
    );

    return res.status(200).json({
      status: 'success',
      data: { rows },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    // TODO: GET USER'S 'SKILLS'
    const data = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    console.log(data);
    return res.status(200).json({
      status: 'success',
      data: 'HELLO',
    });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, skills }: User = req.body;

  const passwordHash: string = await bcrypt.hash(password, 12);

  try {
    //todo: ADD 'SKILLS' TO DATABASE
    const data = await client.query(
      'INSERT INTO users (firstName, lastName, email, passwordHash, createdOn, lastLogin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, email, passwordHash, new Date(), new Date()],
    );

    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
