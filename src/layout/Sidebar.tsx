import { CogIcon, LogoutIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { GUARD_ROUTES } from '../GuardConfig'
import { AuthContext } from '../UserContext'
import classNames from '../utils/classNames'

const links = [
	{ name: 'Paramètres', href: '/admin', icon: CogIcon, roles: GUARD_ROUTES.admin.page }
]

export default function Sidebar() {
	const router = useRouter()
	const authCtx = useContext(AuthContext)

	const [active, setActive] = useState(false)

	function handleLogout() {
		localStorage.removeItem('token')
		router.push('/login')
	}

	return (
		<>
			<div className='fixed z-40 flex h-screen w-16 flex-col border-r-2 border-secondary bg-white'>
				<div className='mb-6 box-border flex h-16 items-center justify-center border-b-2 border-secondary py-6 px-4'>
					<Link href='/'>
						<div>
							<Image
								src='/logo--small.svg'
								alt='logo'
								width='50'
								height='26'
								className='cursor-pointer'
							/>
						</div>
					</Link>
				</div>
				<nav>
					<ul className='mt-2 flex flex-col gap-3'>
						{links.map(item =>
							authCtx?.authUser && item.roles.includes(authCtx?.authUser.role) ? (
								<li key={item.name} className={'flex cursor-pointer justify-center px-4'}>
									<Link href={item.href} className={'flex justify-center'}>
										<item.icon
											className={classNames(
												'flex h-6 w-6 items-center justify-center',
												router.asPath === item.href ? 'text-secondary' : 'text-grey-400'
											)}
											aria-hidden='true'
										/>
									</Link>
								</li>
							) : null
						)}
					</ul>
				</nav>
				<div
					className={
						'avatar justif absolute bottom-0 left-0 flex h-16 w-full items-center justify-center gap-2 border-t-2 border-secondary px-2 py-4'
					}
				>
					<div
						className={
							'box-border flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-secondary font-medium text-white'
						}
						onClick={() => {
							setActive(!active)
						}}
					>
						<span>{authCtx?.authUser?.firstname[0]}</span>
						<span>{authCtx?.authUser?.lastname[0]}</span>
					</div>
				</div>
			</div>
			<div
				className={classNames(
					'justif fixed bottom-0 z-30 flex h-16 flex-col justify-evenly rounded-r-md border-y-2 border-r-2 border-secondary bg-white py-2 px-2 text-sm transition-all duration-100 ease-in-out',
					active ? 'translate-x-16' : '-translate-x-20'
				)}
			>
				<Link className={'cursor-pointer text-secondary'} href={'/profil'}>
					Profil
				</Link>
				<button
					className={'flex cursor-pointer items-center text-alert_dark'}
					onClick={handleLogout}
				>
					Se déconnecter <LogoutIcon className={'ml-1 h-4 w-4'} />
				</button>
			</div>
		</>
	)
}
