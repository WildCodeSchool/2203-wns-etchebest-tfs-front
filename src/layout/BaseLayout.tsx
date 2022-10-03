import type { ReactElement } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface Properties {
	children?: ReactElement
	name: String
	button?: ReactElement
}

export default function BaseLayout({ children, name, button }: Properties): ReactElement {
	return (
		<>
			<div className={'flex h-screen'}>
				<Sidebar />
				<div className={'w-full min-h-screen pl-40 pr-24 bg-grey-50 overflow-hidden'}>
					<Header name={name} button={button} />
					<main className={'w-full'}>{children}</main>
				</div>
			</div>
		</>
	)
}

BaseLayout.defaultProps = {
	children: <></>
}
