// Basic Modules
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Webpack Plugins
const bar = require('webpackbar')
const nodemon = require('nodemon-webpack-plugin')
const dotenv = require('dotenv-webpack')
const compress = require('compression-webpack-plugin')
const errors = require('friendly-errors-webpack-plugin')

// Externals
const nodeExternals = require('webpack-node-externals')

// Configuration Files
const pkg = require(path.resolve(__dirname, '..', 'package.json'))

module.exports = {
	mode: 'production',
	watch: false,
	devtool: 'inline-source-map',
	stats: 'all',

	target: 'node',

	entry: {
		main: path.join(__dirname, '..', 'src', 'index.ts'),
	},

	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '..', 'dist'),
		chunkFilename: '[id].chunk.js',
		publicPath: path.join(__dirname, '..', 'dist', 'public'),
		pathinfo: false,
	},

	resolve: {
		extensions: ['.ts', '.js', '.json'],
		modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
	},

	module: {
		rules: [
			{
				test: /\.ts?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'cache-loader',
					},
					{
						loader: 'thread-loader',
						options: {
							workers: 4,
							workerParallelJobs: 450,
							workerNodeArgs: ['--max-old-space-size=1024'],
							poolRespawn: false,
							poolTimeout: 3600,
							poolParallelJobs: 500,
							name: 'typescript-pool',
						},
					},
					{
						loader: 'ts-loader',
						options: {
							happyPackMode: true,
							transpileOnly: true,
						},
					},
					{
						loader: 'babel-loader',
						options: {
							compact: false,
							presets: ['@babel/preset-env', '@babel/preset-typescript'],
							plugins: [
								'@babel/plugin-transform-runtime',
								[
									'@babel/plugin-proposal-decorators',
									{
										legacy: true,
									},
								],
								'@babel/proposal-class-properties',
								'@babel/proposal-object-rest-spread',
							],
						},
					},
				],
			},
		],
	},

	externals: [nodeExternals()],

	plugins: [
		new compress({
			test: 'bundle.js',
			filename: 'bundle.gz',
			cache: true,
			algorithm: 'gzip',
			threshold: 10240,
			minRatio: 0.8,
		}),
		new nodemon({
			quiet: true,
		}),
		new bar({
			name: '@aeropods/api',
			color: 'green',
			profile: 'true',
			fancy: 'true',
		}),
	],
}
