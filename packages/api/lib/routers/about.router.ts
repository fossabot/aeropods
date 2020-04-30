import { Router } from 'express'
import { AboutController } from '../controllers'

/** Example router that returns a Hello World from controller, it's responsible for being a boilerplate to quickly create a new ones, delete that if you don't need a sample one. */
export class AboutRouter {
	router: Router
	public controller: AboutController = new AboutController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.get('/', this.controller.showInformation)
		this.router.get('/postman', this.controller.postmanDocumentation)
	}
}
