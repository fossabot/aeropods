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

// prettier-ignore
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

module.exports = BaseConfiguration
