import { Router } from 'express'
import { UserController } from '../controllers'

export class UserRouter {
	public router: Router
	public controller: UserController = new UserController()

	constructor() {
		this.router = Router()
		this.routes()
	}

	routes() {
		this.router.get('/', this.controller.getHelloWorld)
	}
}
