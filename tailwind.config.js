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
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			slate: colors.slate,
			blue: colors.blue,
			indigo: colors.indigo,
			green: colors.green,
			red: colors.red,
			yellow: colors.yellow,
			primary: {
				"10": "#f2f8ff",
				"50": "#d6e8fe",
				"100": "#bbd9fd",
				"200": "#86bafa",
				"300": "#579ff5",
				"400": "#3088ed",
				"500": "#1376e4",
				"600": "#0067d7",
				"700": "#0062c7",
				"800": "#005bb3",
				"900": "#00529e",
				"950": "#004887",
				"999": "#004887",
		},
			secondary: '#14b8a6',
			tertiary: '#e0e7ff',

		}
	},
	corePlugins: {
		aspectRatio: false
	},
	experimental: { optimizeUniversalDefaults: true },
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
}
