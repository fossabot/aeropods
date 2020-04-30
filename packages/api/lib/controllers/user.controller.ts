import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import signale from 'signale'

export class UserController {
	/** Function that returns all users contained in database. */
	public async getUsers(req: Request, res: Response) {
		const prisma = new PrismaClient()
		const users = await prisma.user.findMany().catch(e => signale.error(e))
		res.json(users).status(200)
	}

	/** Function that returns one user with id (email) specified in parameter. */
	public async getUser(req: Request, res: Response) {
		const user = await new PrismaClient().user.findOne({
			where: {
				id: parseInt(req.params.id),
			},
		})
		res.json(user).status(200)
	}

	/** Function that creates a new user in database. */
	// ! This function randomly crashes without real reason, it should be reviewed and potentially rewrited.
	public async createUser(req: Request, res: Response) {
		const user = await new PrismaClient().user
			.create({
				data: { email: req.body.email },
			})
			.catch(e => signale.error(e))
	}

	/** Function that updates user specified in params. */
	public async patchUser(req: Request, res: Response) {
		const user = await new PrismaClient().user
			.update({
				where: {
					id: parseInt(req.params.id),
				},
				data: {
					email: req.body.email,
				},
			})
			.catch(e => signale.error(e))
	}

	/** Function that deletes a user with id specified in params. */
	public async deleteUser(req: Request, res: Response) {
		const user = await new PrismaClient().user
			.delete({
				where: {
					id: parseInt(req.params.id),
				},
			})
			.catch(e => signale.error(e))
	}
}
