import { Request, Response, NextFunction } from 'express';
import { client } from '../elephantsql';

export const getSkills = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await client.query('SELECT * FROM skills');

    return res.status(200).json({
      status: 'success',
      data: { rows },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createSkill = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const { rows } = await client.query('INSERT INTO skills (name) VALUES ($1) RETURNING *', [
      name,
    ]);

    return res.status(201).json({
      status: 'success',
      data: { skill: rows[0] },
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteSkill = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM skills WHERE skill_id = $1', [id]);
  } catch (err) {
    console.error(err);
  }
};
