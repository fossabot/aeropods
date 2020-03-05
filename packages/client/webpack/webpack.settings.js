/* eslint-disable no-undef */
require('dotenv').config()
const path = require('path')

module.exports = {
	/** Desired name of Application. */
	name: '@aeropods/client',
	copyright: 'araclx Inc.',
	paths: {},
	target: 'web',
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
		main: path.join(__dirname, '..', 'lib', 'index.tsx'),
		html: path.join(__dirname, '..', 'public', 'index.html'),
	},
}
