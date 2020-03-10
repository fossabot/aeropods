// Node Modules
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Chain Configuration of Webpack
// https://www.npmjs.com/package/webpack-chain

const webpackChain = require('webpack-chain')
const developmentConfiguration = require('./webpack.common')

// Webpack Plugins
const WebpackNotifierPlugin = require('webpack-notifier')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
const WebpackShellPlugin = require('webpack-shell-plugin')
// const { WebpackPluginRamdisk } = require('webpack-plugin-ramdisk')

// Configuration Files
const pkg = require(path.resolve(__dirname, '..', 'package.json'))
const config = require('./webpack.settings')

/*
 *   ____
 *  | __ )  __ _ ___  ___
 *  |  _ \ / _` / __|/ _ \
 *  | |_) | (_| \__ \  __/
 *  |____/ \__,_|___/\___|
 *
 * 	Configurations of plugins is contained bellow.
 */

developmentConfiguration.mode('development')

developmentConfiguration.watch(true)

developmentConfiguration.devtool('source-map')

developmentConfiguration
	// Logging Options
	// This is setted to none because we're using 'friendly-errors-plugin'.
	.stats('none')

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
developmentConfiguration.module
	.rule('Linting')
	.test(/\.ts?$/)
	.pre()
	.use('eslint')
	.loader('eslint-loader')
	.options({
		cache: true,
		fix: true,
		failOnError: false, // Disabled just for testing, should be turn on.
		failOnWarning: false,
		emitWarning: true,
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

// This solution is storaging data in RAM, Windows users cannot use that.
// developmentConfiguration
// 	.plugin('Ramdisk')
// 	.use(WebpackPluginRamdisk, [{ name: 'aeropods' }])

developmentConfiguration
	.plugin('FriendlyErrorsWebpackPlugin')
	.use(FriendlyErrorsWebpackPlugin, [
		{
			compilationSuccessInfo: {
				messages: ['You application is running here http://localhost:8080'],
				notes: [
					'Some additionnal notes to be displayed unpon successful compilation \n',
				],
			},
			onErrors: function() {},
			clearConsole: true,
			additionalFormatters: [],
			additionalTransformers: [],
		},
	])

developmentConfiguration.plugin('Serve').use(Serve, [
	{
		compress: true,
		hmr: true,
		progress: false,
		open: false,
		liveReload: true,
		status: false,
		port: 8080,
		static: config.output.directory,
		log: {
			level: 'error',
		},
		client: {
			silent: true,
		},
	},
])

developmentConfiguration
	.plugin('WebpackNotifierPlugin')
	.use(WebpackNotifierPlugin, [{ title: '@areopods/server' }])

developmentConfiguration.plugin('WebpackShell').use(WebpackShellPlugin, [
	{
		onBuildEnd: ['yarn run devtools'],
	},
])

module.exports = developmentConfiguration.toConfig()
