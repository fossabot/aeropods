// Node Modules
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

// Chain Configuration of Webpack
// https://www.npmjs.com/package/webpack-chain

const webpackChain = require('webpack-chain')
const productionConfiguration = require('./webpack.common')

// Webpack Plugins
const CompressionPlugin = require('compression-webpack-plugin')

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

productionConfiguration
	.entry('main')
	.add(config.entries.main)
	.end()

productionConfiguration.mode('production')

productionConfiguration.watch(false)

productionConfiguration
	// Logging Options
	// This is setted to none because we're using 'friendly-errors-plugin'.
	.stats('normal')

productionConfiguration.optimization.splitChunks({
	chunks: 'initial',
	cacheGroups: {
		commons: {
			test: /[\\/]node_modules[\\/]/,
			name: 'vendor',
			chunks: 'initial',
		},
	},
})

/*
 *   __  __           _       _
 *  |  \/  | ___   __| |_   _| | ___  ___
 *  | |\/| |/ _ \ / _` | | | | |/ _ \/ __|
 *  | |  | | (_) | (_| | |_| | |  __/\__ \
 *  |_|  |_|\___/ \__,_|\__,_|_|\___||___/
 *
 *	BaseConfiguration of specified universal loaders.
 */

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

productionConfiguration.plugin('CompressionPlugin').use(CompressionPlugin, [
	{
		filename: 'bundle.gz',
		cache: true,
		algorithm: 'gzip',
	},
])

productionConfiguration
	.plugin('AggresiveSplitting')
	.use(webpack.optimize.AggressiveSplittingPlugin, [
		{
			minSize: 10000,
			maxSize: 30000,
		},
	])

module.exports = productionConfiguration.toConfig()
