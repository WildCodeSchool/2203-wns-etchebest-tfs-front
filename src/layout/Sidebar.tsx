import {
	CogIcon,
	LogoutIcon
} from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import classNames from '../utils/classNames'

const links = [
	{ name: 'Paramètres', href: '/settings', icon: CogIcon }
]

export default function Sidebar() {

	const router = useRouter()

	const [active, setActive] = useState(false)

	function handleLogout() {
		localStorage.removeItem('token')
		router.push("/login")
	}

	return (
		<>
			<div className={'fixed flex h-screen flex-col border-r-2 border-secondary w-16 bg-white z-40'}>
				<div className={'mb-6 py-6 border-b-2 border-secondary px-4 flex items-center justify-center h-16 box-border'}>
					<Link href={'/'}>
						<Image src='/logo.svg' alt='logo' width='50' height='26' className={'cursor-pointer'}/>
					</Link>
				</div>
				<nav className={''}>
					<ul className={'mt-2 flex flex-col gap-3'}>
						{links.map(item => (
							<li key={item.name} className={'flex justify-center px-4 cursor-pointer'}>
								<Link href={item.href} className={'flex justify-center'}>
									<item.icon
										className={classNames(
											'h-6 w-6 flex items-center justify-center',
											router.asPath === item.href ? 'text-secondary' : 'text-grey-400'
											)
										}
										aria-hidden='true'
									/>
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div
					className={'absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 border-t-2 border-secondary justif px-2 py-4 h-16'}>
					<div className={'h-10 w-10 rounded-full bg-grey-300 box-border cursor-pointer'} onClick={() => {setActive(!active)}}></div>
				</div>
				
			</div>
			<div className={classNames(
				'fixed bottom-0 flex flex-col justify-evenly py-2 border-y-2 border-r-2 rounded-r-md border-secondary justif px-2 h-16 text-sm z-30 transition-all ease-in-out duration-100 bg-white',
				active ? 'translate-x-16' : '-translate-x-20'
				)}>
				<p className={'text-secondary cursor-pointer'}>Profil</p>
				<button className={'text-alert_dark flex items-center cursor-pointer'} onClick={handleLogout}>Se déconnecter <LogoutIcon className={'h-4 w-4 ml-1'} /></button>
			</div>
		</>

	)
}
