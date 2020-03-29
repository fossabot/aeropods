import { Request, Response } from 'express'

export class SampleController {
	constructor() {}
	public helloWorld(req: Request, res: Response) {
		res.json('Hello World')
	}
}
