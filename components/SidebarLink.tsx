import { useRouter } from 'next/router'
import classNames from '../utils/classNames'

function SidebarLink({ children, href, icon }: any) {
	const router = useRouter()
	console.log(router)
	const classes = classNames(
		'cursor-pointer rounded-md p-2 pr-24 flex',
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
		<li className={''}>
			<a href={href} onClick={handleClick}>
				<div className={classes}>{children}</div>
			</a>
		</li>
	)
}

export default SidebarLink
