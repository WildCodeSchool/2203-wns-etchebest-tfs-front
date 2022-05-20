import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import classNames from '../utils/classNames'

interface Properties {
	children: ReactElement | string
	href: string
	className?: string
}

function Link(props: Properties) {
	const router = useRouter()

	const { children, href, className, ...rest } = props

	const handleClick = (e: any) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<div
			onClick={handleClick}
			className={classNames(
				className ?? 'font-medium text-green-600 hover:text-green-500',
				'cursor-pointer'
			)}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Link
