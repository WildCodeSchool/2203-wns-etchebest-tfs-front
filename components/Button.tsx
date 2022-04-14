import React from 'react'
import classNames from '../utils/classNames'

const Button = (props: any) => {
	const { size, children, className, ...other } = props
	let classes = classNames(
		`inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 `,
		className
			? className
			: 'rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
	)

	switch (size) {
		case 'xs':
			classes = classNames(classes, 'text-xs px-2.5 py-1.5')
			break
		case 'sm':
			classes = classNames(classes, 'leading-4 text-sm px-3 py-2')
			break
		case 'md':
			classes = classNames(classes, 'text-sm px-4 py-2')
			break
		case 'xl':
			classes = classNames(classes, 'text-base px-4 py-2')
			break
		case 'xxl':
			classes = classNames(classes, 'text-base px-4 py-3')
			break
	}

	return (
		<button type='button' {...other} className={classes}>
			{children}
		</button>
	)
}
Button.defaultProps = { size: 'md' }

export default Button
