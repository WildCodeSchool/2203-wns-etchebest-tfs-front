import type { ReactElement } from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

interface Properties {
	children?: ReactElement
	name: String
}

const BaseLayout = ({ children, name }: Properties): ReactElement => {
	return (
		<>
			<div className={'flex h-screen'}>
				<Sidebar />
				<div className={'flex w-full flex-col justify-between'}>
					<div className={'w-full'}>
						<Header name={name} />
						<main className={'p-4'}>{children}</main>
					</div>
					<Footer />
				</div>
			</div>
		</>
	)
}

BaseLayout.defaultProps = {
	children: <></>
}

export default BaseLayout
