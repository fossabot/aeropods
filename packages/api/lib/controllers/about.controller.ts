import { Request, Response } from 'express'

export class AboutController {
	constructor() {}
	public showInformation(req: Request, res: Response) {
		const pkg = require('../../package.json')
		res.json({
			name: pkg.name,
			version: pkg.version,
		})
	}
	public postmanDocumentation(req: Request, res: Response) {
		const postmanDocumentation = require('../data/@aeropods-api.postman_collection.json')
		res.json(postmanDocumentation)
	}
}
