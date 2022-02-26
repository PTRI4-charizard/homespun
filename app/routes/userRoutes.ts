import express, { Request, Response, NextFunction } from 'express';
import { getUsers, getUser, createUser } from '../controllers/userController';

class SkillRoutes {
  express: any; //TODO: replace any with the actual type
  constructor(express: any) {
    this.express = express;
  }
  init() {
    this.express.get('/users', getUsers);
    this.express.post('/users', createUser);
    this.express.get('/users/:id', getUser);
  }
}
export default SkillRoutes;
