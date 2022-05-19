import type { ReactElement } from 'react'

interface Properties {
	name: String
	button?: ReactElement
}

const Header = ({ name, button }: Properties): ReactElement => {
	return (
		<div className={'w-full bg-white px-16 py-4 shadow-md'}>
			{name}
			{button}
		</div>
	)
}

export default Header
