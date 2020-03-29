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
const filter = require('webpack-filter-warnings-plugin');


// Externals
var nodeExternals = require('webpack-node-externals')

var nodeModules = {}

fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod
	})


module.exports = {
	mode: 'development',
	watch: true,
	devtool: 'inline-source-map',
	stats: 'detailed',

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
		extensions: ['.ts', '.js', '.mjs', '.json'],
		modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
	},

	externals: [nodeModules, nodeExternals()],

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: true,
		__dirname: true
	},

	module: {
		rules: [
			{
				test: /\.node$/,
				use: 'node-loader'
			  },
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
								'babel-plugin-transform-typescript-metadata',
								["@babel/plugin-proposal-decorators", { "legacy": true }],
								["@babel/plugin-proposal-class-properties", { "loose": true }],
								'@babel/proposal-object-rest-spread',
							],
						},
					},
				],
			},
		],
	},

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
		new errors({}),
		new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
			result.request = result.request.replace(/typeorm/, "typeorm/browser");
		})
	],
}
