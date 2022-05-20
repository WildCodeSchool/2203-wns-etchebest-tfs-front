import type { ReactElement } from 'react'
import Notification from '../components/Notification'
import Search from '../components/Search'

interface Properties {
	name: String
	button?: ReactElement
}

const Header = ({ name, button }: Properties): ReactElement => {
	return (
		<div
			className={
				'flex w-full items-center justify-between bg-white px-16 py-4 shadow-md'
			}
		>
			<div className={'flex flex-col'}>
				{name}
				{button}
			</div>
			<div className={'flex space-x-5'}>
				<Search />
				<Notification />
			</div>
		</div>
	)
}

export default Header
