/* eslint-disable @typescript-eslint/no-type-alias */
import type { HTMLAttributes, ReactElement } from 'react'
import classNames from '../utils/classNames'
import { Loader } from './common/Loader'


type Type = 'button' | 'submit'

interface Properties extends HTMLAttributes<HTMLButtonElement> {
	children: ReactElement | string
	type?: Type
	className?: string
	disabled?: boolean
	fullWidth?: boolean
	loading?: boolean
}

const Button = (props: Properties): ReactElement => {
	const { type, children, className, fullWidth, loading, disabled, ...rest } = props

	let classes = classNames(
		`relative min-h-14 border border-transparent text-sm duration-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2  px-6 py-3 disabled:text-grey-500 disabled:bg-grey-300 disabled:hover:bg-grey-300`,
		className ??
			'rounded-sm text-white bg-secondary hover:bg-primary focus:ring-grey-500'						
	)
	if(fullWidth) {
		classes = classNames(classes, 'w-full')
	}
	if(loading) {
		//Permet de garder le bouton de la même taille.
		//Le loader est positionné en absolute par dessus le text.
		classes = classNames(classes, 'text-transparent')
	}


	return (
		<button
			type={type === 'submit' ? 'submit' : 'button'}
			className={classes}
			disabled={disabled}
			{...rest}
		>
			{children}
			{loading && <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>}
		</button>
	)
}
Button.defaultProps = {
	type: 'button',
	className: null
}

export default Button
