/* eslint-disable @typescript-eslint/no-type-alias */
import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import classNames from '../../utils/classNames'
import { Loader } from '../common/Loader'


type Type = 'button' | 'submit'

interface Properties extends HTMLAttributes<HTMLButtonElement> {
	children: ReactElement | string | ReactNode
	type?: Type
	className?: string
	disabled?: boolean
	fullWidth?: boolean
	loading?: boolean
	outlined?: boolean
	alert?: boolean
	icon?: ReactElement
}

export default function Button(props: Properties): ReactElement {
	const { type, children, className, fullWidth, loading, disabled, outlined, alert,icon, ...rest } = props

	let classes = classNames(
		`relative inline-flex min-h-14 border justify-center border-transparent text-sm duration-100 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2  px-6 py-3 disabled:text-grey-500 disabled:bg-grey-300 disabled:hover:bg-grey-300 flex items-center gap-1`,
		outlined ? 'text-secondary bg-white border-2 border-secondary font-semibold hover:text-white hover:bg-secondary transition-all duration-75 ease-in-out' : 'text-white bg-secondary hover:bg-primary focus:ring-grey-500',
		className ??
			'rounded-sm '						
	)
	if(fullWidth) {
		classes = classNames(classes, 'w-full')
	}
	if(loading) {
		classes = classNames(classes, 'text-transparent')
	}
	if(alert && !outlined){
		classes = classNames(classes, 'text-white border-alert bg-alert hover:bg-alert_dark hover: border-alert_dark')
	} 
	else if(alert && outlined){
		classes = classNames(classes, 'text-alert bg-transparent border-alert hover:bg-alert')
	}


	return (
		<button
			type={type === 'submit' ? 'submit' : 'button'}
			className={classes}
			disabled={disabled}
			{...rest}
		>
			{icon && <span>{icon}</span>}
			{children}
			{loading && <Loader className="absolute text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>}
		</button>
	)
}
Button.defaultProps = {
	type: 'button',
	className: null
}

