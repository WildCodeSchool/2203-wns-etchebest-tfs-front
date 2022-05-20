/* eslint-disable @typescript-eslint/no-type-alias */
import type { HTMLAttributes, ReactElement } from 'react'
import classNames from '../utils/classNames'

type Type = 'button' | 'submit'

interface Properties extends HTMLAttributes<HTMLButtonElement> {
	children: ReactElement | string
	type?: Type
	className?: string
}

const Button = (props: Properties): ReactElement => {
	const { type, children, className, ...rest } = props

	let classes = classNames(
		`inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 px-2.5 py-1.5`,
		className ??
			'rounded-md text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
	)

	return (
		<button
			type={type === 'submit' ? 'submit' : 'button'}
			className={classes}
			{...rest}
		>
			{children}
		</button>
	)
}
Button.defaultProps = {
	type: 'button',
	className: null
}

export default Button
