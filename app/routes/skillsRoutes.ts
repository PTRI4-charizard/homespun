import { getSkills, createSkill } from '../controllers/skillController';

class SkillRoutes {
  express: any; //TODO: replace any with the actual type
  constructor(express: any) {
    this.express = express;
  }
  init() {
    this.express.get('/skills', getSkills);
    this.express.post('skills', createSkill);
  }
}
export default SkillRoutes;
