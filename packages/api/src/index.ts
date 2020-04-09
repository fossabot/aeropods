import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import signale from 'signale'
import 'reflect-metadata'

import { SampleRouter, UserRouter } from './routers'
/**
 * Main class dedicated for running and configuring server.
 */
class Server {
	/* Basic Declarations */
	public app: express.Application

	/* Constuctor of basic variables */
	constructor() {
		this.app = express()
		this.middleware()
		this.routes()
		this.database()
	}

	public middleware(): void {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use(compression())
		this.app.use(cors())
		this.app.use(morgan('dev'))
	}

	public routes(): void {
		this.app.use('/', new SampleRouter().router)
		this.app.use('/user', new UserRouter().router)
	}

	/** Main execution point of whole application. */
	public launchup(): void {
		this.app.listen(3600, () => {
			signale.success('Your application started successfully!')
			signale.info('Application running on http://localhost:%d', 3600)
			console.log('')
		})
	}
}

const application = new Server()

application.launchup()
