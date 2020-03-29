import { Request, Response } from 'express'

import { User } from '../entity'

export class UserController {
	public async getUsers(req: Request, res: Response) {}
	public async getUser(req: Request, res: Response) {}
	public async patchUser(req: Request, res: Response) {}
	public async deleteUser(req: Request, res: Response) {}
}
