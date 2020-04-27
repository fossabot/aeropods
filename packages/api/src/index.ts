import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import signale from 'signale'
import 'reflect-metadata'
import graphqlHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import { AboutRouter, UserRouter } from './routers'

class Server {
	/* Basic Declarations */
	public app: express.Application

	/* Constuctor of basic variables */
	constructor() {
		this.app = express()
		this.middleware()
		this.routes()
	}

	/* Middleware of server */
	public middleware(): void {
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({ extended: false }))
		this.app.use(compression())
		this.app.use(cors())
		this.app.use(morgan('dev'))
	}

	/* Routers contained in application */
	public routes(): void {
		this.app.use('/', new AboutRouter().router)
		this.app.use('/user', new UserRouter().router)
		this.app.use(
			'/graphql',
			graphqlHTTP({
				schema: buildSchema(`
		      type Query {
		        hello: String
		      }
		    `),
				rootValue: {
					hello: () => {
						return 'Hello world!'
					},
				},
				graphiql: true,
			})
		)
	}

	/** Main execution point of whole application, this function starts a server at 3600 port, and it's not recommended to change it because it's actually configured in Nginx. */
	public launchup(): void {
		this.app.listen(3600, () => {
			signale.success('🚀  Application running on http://localhost:%d', 3600)
			console.log('')
		})
	}
}

const application = new Server()

application.launchup()
