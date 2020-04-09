// Node Modules
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Chain Configuration of Webpack
// https://www.npmjs.com/package/webpack-chain

const webpackChain = require('webpack-chain')
const developmentConfiguration = require('./webpack.common')

// Webpack Plugins
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')
// const { WebpackPluginRamdisk } = require('webpack-plugin-ramdisk')

// Configuration Files
const pkg = require(path.resolve(__dirname, '..', 'package.json'))
const config = require('./webpack.settings')

// Base Configuration

developmentConfiguration
	.entry('main')
	.add(config.entries.main)
	.add('webpack-plugin-serve/client')
	.end()

developmentConfiguration.mode('development')

developmentConfiguration.watch(true)

developmentConfiguration.devtool('source-map')

developmentConfiguration
	// Logging Options
	// This is setted to none because we're using 'friendly-errors-plugin'.
	.stats('none')

// Module Configuration

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

// Plugins

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

module.exports = developmentConfiguration.toConfig()
