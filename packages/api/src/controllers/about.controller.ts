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
}
