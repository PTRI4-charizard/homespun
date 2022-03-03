import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { client } from '../elephantsql';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  skills: string[];
}

const getSkillsObj = async () => {
  const { rows: skills } = await client.query('SELECT * FROM skills');

  return skills.reduce((output, skill) => {
    output[skill.skill_id] = skill.name;
    return output;
  }, {});
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await client.query(
      'SELECT user_id, firstName, lastName, email FROM users ORDER BY user_id ASC',
    );

    return res.status(200).json({
      status: 'success',
      data: { users: rows },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
    const user = result.rows[0];

    const { rows: skillIds } = await client.query(
      'SELECT skill_id FROM user_skills WHERE user_id = $1',
      [id],
    );

    const skillsObj = await getSkillsObj();

    user.skills = skillIds.map(({ skill_id }) => skillsObj[skill_id]);

    console.log(user);

    return res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, skills }: User = req.body;

  const passwordHash: string = await bcrypt.hash(password, 12);

  try {
    const { rows } = await client.query(
      'INSERT INTO users (firstName, lastName, email, passwordHash, createdOn, lastLogin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [firstName, lastName, email, passwordHash, new Date(), new Date()],
    );
    const user = rows[0];

    const result = await client.query('SELECT * FROM skills');
    const skillsTable = result.rows.reduce((output, skill) => {
      output[skill.name] = skill.skill_id;
      return output;
    }, {});

    const skillsQueries = skills.map((skill) =>
      client.query('INSERT INTO user_skills (skill_id, user_id) VALUES ($1, $2) RETURNING *', [
        skillsTable[skill],
        user.user_id,
      ]),
    );
    const results = await Promise.all(skillsQueries);

    user.skills = skills;

    return res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    console.log(err);
  }
};
