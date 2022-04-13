const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./layout/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		}
	},
	corePlugins: {
		aspectRatio: false
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
}
