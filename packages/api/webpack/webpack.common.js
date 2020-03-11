/* eslint-disable prettier/prettier */

/* Copyright (C) 2020 Jakub Olan - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, which unfortunately won't be
 * written for another century.
 */

// Node Modules
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Chain BaseConfiguration of Webpack
const webpackChain = require('webpack-chain')

// Webpack Plugins
const WebpackBar = require('webpackbar')
const Dotenv = require('dotenv-webpack')

// BaseConfiguration Files
const pkg = require(path.resolve(__dirname, '..', 'package.json'))
const config = require('./webpack.settings')

// Customized solution for usage of external modules, in Webpack.
// That's necessary to avoid thousents of errors when compiling app.
var nodeModules = {}

fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod
	})

// Base Webpack BaseConfiguration
const BaseConfiguration = new webpackChain()

/*
 *   ____
 *  | __ )  __ _ ___  ___
 *  |  _ \ / _` / __|/ _ \
 *  | |_) | (_| \__ \  __/
 *  |____/ \__,_|___/\___|
 *
 * 	BaseConfiguration of plugins is contained bellow.
 */

// 	output: {
// 		path: path.resolve(__dirname, 'dist'),
// 		filename: 'bundle.js',
// 		chunkFilename: ifProduction('[id].[contentHash].js', '[id].chunk.js'),
// 		publicPath: path.resolve(__dirname, 'dist', 'public'),
// 		pathinfo: false,
// 	},

BaseConfiguration
	// BaseConfiguration of Entry Points
	.entry('main')
	.add(config.entries.main)
	.end()

BaseConfiguration
	// Target of compilation
	.target(config.target)

BaseConfiguration.output
	.filename(config.output.filename)
	.path(config.output.directory)
	.chunkFilename('[id].chunk.js')
	.publicPath(config.output.publicDirectory)
	.pathinfo(false)

BaseConfiguration.resolve.extensions
	.add('.ts')
	.add('.js')
	.add('.json')
	.add('.c')
	.add('.cpp')
	.add('.wasm')
	.add('.graphql')
	.end()

BaseConfiguration.resolve.modules
	.add('node_modules')
	.add(path.resolve(__dirname, 'lib'))

BaseConfiguration.externals(nodeModules)

/*
 *   __  __           _       _
 *  |  \/  | ___   __| |_   _| | ___  ___
 *  | |\/| |/ _ \ / _` | | | | |/ _ \/ __|
 *  | |  | | (_) | (_| | |_| | |  __/\__ \
 *  |_|  |_|\___/ \__,_|\__,_|_|\___||___/
 *
 *	BaseConfiguration of specified universal loaders.
 */

BaseConfiguration.module
	.rule('cppCompilation')
	.test(/\.(c|cpp)$/)
	.use('cppWasmLoader')
	.loader('cpp-wasm-loader')
	.options({
		// emccFlags: (existingFlags: string[], mode?: "wasm"|"asmjs" ) => string[],
		// emccPath: String,
		// fetchFiles: Boolean,
		// memoryClass: Boolean,
		// asmJs: Boolean,
		// wasm: Boolean,
		// fullEnv: Boolean
	})

BaseConfiguration.module
	.rule('wasmCompilation')
	.test(/\.wasm$/)
	.use('wasmLoader')
	.loader('wasm-loader')

BaseConfiguration.module
	.rule('graphqlLoader')
	.test(/\.graphql?$/)
	.use('graphqlLoader')
	.loader('webpack-graphql-loader')
	.options({
		// validate: true,
		// schema: "./path/to/schema.json",
		// removeUnusedFragments: true
		// etc. See "Loader Options" below
	})

BaseConfiguration.module
	.rule('threadedCompilation')
	.test(/\.ts?$/)
	.use('cacheLoader')
	.loader('cache-loader')
	.end()
	.use('threadLoader')
	.loader('thread-loader')
	.options({
		workers: 4,
		workerParallelJobs: 450,
		workerNodeArgs: ['--max-old-space-size=1024'],
		poolRespawn: false,
		poolTimeout: 3600,
		poolParallelJobs: 500,
		name: 'typescript-pool',
	})
	.end()
	.use('typescriptLoader')
	.loader('ts-loader')
	.options({
		happyPackMode: true,
		transpileOnly: true,
	})
	.end()
	.use('babelLoader')
	.loader('babel-loader')
	.options({
		compact: false,
		presets: ['@babel/preset-env', '@babel/preset-typescript'],
		plugins: [
			'@babel/plugin-transform-runtime',
			['@babel/plugin-proposal-decorators', { legacy: true }],
			'@babel/proposal-class-properties',
			'@babel/proposal-object-rest-spread',
		],
	})
	.end()

/*
 *   ____  _             _
 *  |  _ \| |_   _  __ _(_)_ __  ___
 *  | |_) | | | | |/ _` | | '_ \/ __|
 *  |  __/| | |_| | (_| | | | | \__ \
 *  |_|   |_|\__,_|\__, |_|_| |_|___/
 *                 |___/
 *
 * 	BaseConfiguration of plugins is contained bellow.
 */

BaseConfiguration.plugin('WebpackBar').use(WebpackBar, [
	{
		name: config.name,
		color: 'green',
		profile: 'true',
		fancy: 'true',
	},
])

BaseConfiguration.plugin('Dotenv').use(Dotenv, [
	{
		path: '../.env', // load this now instead of the ones in '.env'
		safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
		systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
		silent: true, // hide any errors
		defaults: false, // load '.env.defaults' as the default values if empty.
	},
])

module.exports = BaseConfiguration
