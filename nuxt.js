/**
 * Nuxt buildModule for easy importing
 */
export default function () {
	this.nuxt.hook('components:dirs', (dirs) => {
		dirs.push({
			path: __dirname,
			extensions: ['.js'], // Use transpiled version
			prefix: 'netlify-form'
		})
	})
}

// For NPM
module.exports.meta = require('./package.json')
