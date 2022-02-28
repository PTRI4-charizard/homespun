import { getUsers, getUser, createUser } from '../controllers/userController';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function skillsHandler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': 
      if (req.query.id) {
        await getUser(req, res)
      } else {
        await getUsers(req, res);
      }
      break;
    case 'POST':
      await createUser(req, res);
      break;
  }
  res.status(404).send({msg: 'route not found with selected request method'});
};