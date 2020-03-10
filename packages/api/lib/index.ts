/* eslint-disable prettier/prettier */
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import signale from 'signale'
// import { createConnection, Connection } from 'typeorm'

import { UserRouter } from './routers'

/**
 * Main class dedicated for running and configuring server.
 */
class Server {
	/* Basic Declarations */
	public app: express.Application
	public PORT: number

	/* Constuctor of basic variables */
	constructor(Init: { PORT: number }) {
		this.app = express()
		this.PORT = Init.PORT
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
		this.app.use('/', (req, res) => {
			res.json('Welcome from API Proxy')
		})
	}

	private async database(): Promise<void> {
		// const connection: Connection = await createConnection({
		// 	type: 'mongodb',
		// 	host: 'localhost',
		// 	port: 27017,
		// 	database: 'test',
		// })
	}

	/** Main execution point of whole application. */
	public launchup(): void {
		this.app.listen(this.PORT, () => {
			signale.success('Your application started successfully!')
			signale.info('Application running on http://localhost:%d', this.PORT)
			console.log('')
		})
	}
}

const application = new Server({
	PORT: 3600,
})

application.launchup()
