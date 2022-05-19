import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

interface Properties {
	children: ReactElement | string
	href: string
	className?: string
}

function SidebarLink(props: Properties) {
	const router = useRouter()

	const { children, href, className, ...rest } = props

	const handleClick = (e: any) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<a
			href={href}
			onClick={handleClick}
			className={className ?? 'font-medium text-green-600 hover:text-green-500'}
			{...rest}
		>
			{children}
		</a>
	)
}

export default SidebarLink
