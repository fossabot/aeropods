// Main Webpack file responsible for entry.

if (process.env.NODE_ENV == 'production') {
	module.exports = require('./webpack/webpack.prod')
} else {
	module.exports = require('./webpack/webpack.dev')
}
