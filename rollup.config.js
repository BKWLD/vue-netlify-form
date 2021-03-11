import vue from 'rollup-plugin-vue'
import coffeescript from 'rollup-plugin-coffee-script'
export default {
	input: 'index.vue',
	output: {
		format: 'esm',
		file: 'index.js'
	},
	external: ['vue'],
	plugins: [
		coffeescript(),
		vue(),
	],
};
