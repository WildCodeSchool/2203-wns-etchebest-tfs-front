const defaultConfig = require('tailwindcss/defaultConfig')
const formsPlugin = require('@tailwindcss/forms')
const colors = require('tailwindcss/colors')

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/layout/**/*.{js,ts,jsx,tsx}',
		'./src/utils/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultConfig.theme.fontFamily.sans]
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: colors.white,
			primary: colors.cyan[900],
			secondary: colors.teal[600],
			grey: {
				"50": colors.slate[50],
				"100": colors.slate[50],
				"200": colors.slate[200],
				"300": colors.slate[300],
				"400": colors.slate[400],
				"500": colors.slate[500],
				"700": colors.slate[700],
			},
			alert: colors.rose[400],
			alert_dark: colors.rose[600],
		}
	},
	corePlugins: {
		aspectRatio: false
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
}
