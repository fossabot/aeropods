/* eslint-disable indent */
/* eslint-disable no-undef */

/* Copyright (C) 2020 Jakub Olan - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the MIT license, which unfortunately won't be
 * written for another century.
 */

// Node Modules
const path = require('path')
// const fs = require('fs')
// const webpack = require('webpack')

// Chain BaseConfiguration of Webpack
const webpackChain = require('webpack-chain')

// Webpack Plugins
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// BaseConfiguration Files
// const pkg = require(path.resolve(__dirname, '..', 'package.json'))
const config = require('./webpack.settings')

// Customized solution for usage of external modules, in Webpack.
// That's necessary to avoid thousents of errors when compiling app.
// var nodeModules = {}

// fs.readdirSync('node_modules')
// 	.filter(function(x) {
// 		return ['.bin'].indexOf(x) === -1
// 	})
// 	.forEach(function(mod) {
// 		nodeModules[mod] = 'commonjs ' + mod
// 	})

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

BaseConfiguration
	// Target of compilation
	.target(config.target)

BaseConfiguration.output
	.filename(config.output.filename)
	.path(config.output.directory)
	.chunkFilename('[id].chunk.js')
	.pathinfo(false)

BaseConfiguration.resolve.extensions
	.add('.tsx')
	.add('.ts')
	.add('.js')
	.add('.jsx')
	.add('.json')
	.add('.css')
	.end()

BaseConfiguration.resolve.modules
	.add('node_modules')
	.add(path.resolve(__dirname, '..', 'lib'))

// BaseConfiguration.externals(nodeModules)

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
	.test(/\.tsx?$/)
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
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
			'@babel/preset-typescript',
		],
		plugins: [
			'@babel/plugin-transform-runtime',
			'@babel/proposal-class-properties',
			'@babel/proposal-object-rest-spread',
		],
	})

// prettier-ignore
BaseConfiguration.module
	.rule('CSS')
	.test(/\.css$/)
	.use('StyleLoader')
		.loader('style-loader')
		.end()
	.use('CSSLoader')
		.loader('css-loader')
		.options({ importLoaders: 1 })
		.end()
	.use('PostCSSLoader')
		.loader('postcss-loader')
		.options({
			config: {
				path: path.join(__dirname, '..')
			}
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
		color: 'blue',
		profile: 'true',
		fancy: 'true',
	},
])

BaseConfiguration.plugin('HtmlWebpackPlugin').use(HtmlWebpackPlugin, [
	{
		title: config.name,
		template: config.entries.html,
	},
])

module.exports = BaseConfiguration
