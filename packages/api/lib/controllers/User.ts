import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
// import { validate } from 'class-validator'

import { UserModel } from '../models';

export class UserController {
  public async getHelloWorld(req: Request, res: Response): Promise<void> {
    res.json('Hellow World').status(200)
  }
  public async getUsers(req: Request, res: Response): Promise<void> {
    const userRepository = getRepository(UserModel)
    const users = await userRepository.find({
      select: ['id', 'firstName', 'lastName', 'role']
    })
    res.send(users)
  }
  public async getUser(req: Request, res: Response): Promise<void> {}
  public async createUser(req: Request, res: Response): Promise<void> {}
  public async updateUser(req: Request, res: Response): Promise<void> {}
  public async deleteUser(req: Request, res: Response): Promise<void> {}
}
