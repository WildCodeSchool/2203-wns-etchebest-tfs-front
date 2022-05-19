import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactChild } from 'react'
import classNames from '../utils/classNames'

function SidebarLink({ children, href }: {children:ReactChild, href: string}) {
	
	const router = useRouter()

	const classes = classNames(
		'cursor-pointer rounded-md p-2 pr-24 flex',
		router.asPath === href
			? 'text-white bg-gray-900'
			: 'text-gray-300 hover:bg-gray-700 hover:bg-gray-700 hover:text-white'
	)

	return (
		<li className={''}>
			<Link href={href}>
				<div className={classes}>{children}</div>
			</Link>
		</li>
	)
}

export default SidebarLink
