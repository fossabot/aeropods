import { Router } from 'express'
import { SampleController } from '../controllers'

/** Example router that returns a Hello World from controller, it's responsible for being a boilerplate to quickly create a new ones, delete that if you don't need a sample one. */
export class SampleRouter {
	router: Router
	public controller: SampleController = new SampleController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.get('/', this.controller.helloWorld)
	}
}
