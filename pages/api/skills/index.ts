import { getSkills, createSkill } from '../controllers/skillController';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function skillsHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log('REQUEST METHOD ', req.method)
  switch (req.method) {
    case 'GET': 
      await getSkills(req, res);
      break;
    case 'POST':
      await createSkill(req, res);
      break;
    default:
      res.status(404).send({msg: 'route not found with selected request method'});
      break;
  }
};