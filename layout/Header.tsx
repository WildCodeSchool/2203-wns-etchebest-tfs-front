import type { ReactElement } from 'react'

interface Properties {
	name: String
}

const Header = ({ name }: Properties): ReactElement => {
	return <div className={'w-full bg-white px-16 py-4 shadow-md'}>{name}</div>
}

export default Header
