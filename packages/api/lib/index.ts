import 'reflect-metadata'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import signale from 'signale'
import { AboutRouter, UserRouter } from './routers'
import gradient from 'gradient-string'

class ServerInstance {
	/* Basic Declarations */
	public core: express.Application

	/* Constuctor of basic variables */
	constructor() {
		this.core = express()
		this.middleware()
		this.routes()
	}

	/* Middleware of server */
	public middleware(): void {
		this.core.use(bodyParser.json())
		this.core.use(bodyParser.urlencoded({ extended: false }))
		this.core.use(compression())
		this.core.use(cors())
		this.core.use(morgan('dev'))
	}

	/* Routers contained in application */
	public routes(): void {
		this.core.use('/', new AboutRouter().router)
		this.core.use('/user', new UserRouter().router)
	}

	/** Main execution point of whole application, this function starts a server at 3600 port, and it's not recommended to change it because it's actually configured in Nginx. */
	public launchup(): void {
		this.core.listen(3600, () => {
			signale.success('🚀  Application running on http://localhost:%d', 3600)
			console.log('')
		})
	}
}

console.log(gradient.vice.multiline('\n@aeropods/api\n'))

new ServerInstance().launchup()
