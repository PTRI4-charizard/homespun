import { client } from '../elephantsql';

import type { NextApiRequest, NextApiResponse } from 'next'


export const getSkills = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { rows } = await client.query('SELECT * FROM skills');
    return res.status(200).json({
      status: 'success',
      data: { rows },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({msg: 'Error connecting to database in getSkills', err});
  }
};

export const createSkill = async (req: NextApiRequest, res: NextApiResponse) => {
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

export const deleteSkill = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    await client.query('DELETE FROM skills WHERE skill_id = $1', [id]);
  } catch (err) {
    console.error(err);
  }
};