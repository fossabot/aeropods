module.exports = {
	plugins: [
		require('postcss-import')(),
		require('tailwindcss')(),
		require('postcss-preset-env')({ stage: 1 }),
		require('postcss-nested')(),
		require('postcss-custom-properties'),
		require('autoprefixer')(),
		require('cssnano')({
			preset: 'default',
		}),
		...(process.env.NODE_ENV === 'production'
			? [
					require('@fullhuman/postcss-purgecss')({
						content: ['./lib/**/*.html', './lib/**/*.vue', './lib/**/*.jsx'],
						defaultExtractor: content =>
							content.match(/[\w-/.:]+(?<!:)/g) || [],
					}),
			  ]
			: []),
	],
}
