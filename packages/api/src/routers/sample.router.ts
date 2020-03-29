import { Router } from 'express'
import { SampleController } from '../controllers'

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
