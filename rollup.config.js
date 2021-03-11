import vue from 'rollup-plugin-vue'
import coffeescript from 'rollup-plugin-coffee-script';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
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
		getBabelOutputPlugin({
			presets: ['@babel/preset-env'],
			plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
		})
	],
};
