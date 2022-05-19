import { useRouter } from 'next/router'
import classNames from '../utils/classNames'

function SidebarLink({ children, href, icon }: any) {
	const router = useRouter()

	const handleClick = (e: any) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<a
			href={href}
			onClick={handleClick}
			className={'font-medium text-green-600 hover:text-green-500'}
		>
			{children}
		</a>
	)
}

export default SidebarLink
