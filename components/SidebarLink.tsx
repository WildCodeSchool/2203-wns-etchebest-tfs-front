import { useRouter } from 'next/router'
import classNames from '../utils/classNames'

function SidebarLink({ children, href, icon }: any) {
	const router = useRouter()
	console.log(router)
	const test =
		'group flex cursor-pointer rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:bg-gray-700 hover:text-white'
	const classes = classNames(
		'cursor-pointer rounded-md p-2',
		router.asPath === href
			? 'text-white bg-gray-900'
			: 'text-gray-300 hover:bg-gray-700 hover:bg-gray-700 hover:text-white'
	)
	console.log(icon)

	const handleClick = (e: any) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<a href={href} onClick={handleClick}>
			<div className={classes}>{children}</div>
		</a>
	)
}

export default SidebarLink
