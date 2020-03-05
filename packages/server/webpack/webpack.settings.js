/* eslint-disable no-undef */
require('dotenv').config()
const path = require('path')

module.exports = {
	/** Desired name of Application. */
	name: '@aeropods/server',
	copyright: 'araclx Inc.',
	paths: {},
	target: 'node',
	output: {
		filename: 'bundle.js',
		directory: path.resolve(__dirname, '..', 'dist'),
		publicDirectory: path.resolve(__dirname, '..', 'dist', 'public'),
	},
	urls: {
		live: 'https://something.com',
		local: 'https://localhost:3000',
		critical: 'http://localhost:3000',
		publicPath: () => process.env.PUBLIC_PATH || '/dist/',
	},
	vars: {
		cssName: 'styles',
	},
	entries: {
		main: path.join(__dirname, '..', 'lib', 'index.ts'),
	},
}
