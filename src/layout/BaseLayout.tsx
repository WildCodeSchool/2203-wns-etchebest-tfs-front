import type { PropsWithChildren, ReactElement } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface BaseLayoutProps extends PropsWithChildren {
	name: String
	button?: ReactElement
}

export default function BaseLayout({ children, name, button }: BaseLayoutProps): ReactElement {
	return (
		<>
			<div className='flex h-screen'>
				<Sidebar />
				<main className='w-full min-h-screen pl-40 pr-24 pb-20 bg-grey-50 overflow-y-scroll'>
					<Header name={name} button={button} />
					<section className='w-full'>{children}</section>
				</main>
			</div>
		</>
	)
}

