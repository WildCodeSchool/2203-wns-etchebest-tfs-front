import {
	HomeIcon,
	UserIcon,
	ClipboardCheckIcon,
	BookmarkIcon
} from '@heroicons/react/outline'
import SidebarLink from '../components/SidebarLink'

const links = [
	{ name: 'Accueil', href: '/', icon: HomeIcon },
	{ name: 'Tickets', href: '/task', icon: ClipboardCheckIcon },
	{ name: 'Projets', href: '/project', icon: BookmarkIcon },
	{ name: 'Utilisateurs', href: '/user', icon: UserIcon }
]

const Sidebar = () => {
	return (
		<div className={'relative flex h-full flex-col bg-gray-800 py-10 px-10'}>
			<div className={'mb-12 text-white'}>Logo</div>
			<nav>
				<ul className={'mt-2 flex flex-col space-y-1'}>
					{links.map(item => (
						<SidebarLink key={item.name} href={item.href}>
							<>
								<item.icon
									className={
										'mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-300'
									}
									aria-hidden='true'
								/>
								{item.name}
							</>
						</SidebarLink>
					))}
				</ul>
			</nav>
			<div
				className={
					'absolute bottom-0 left-0 flex w-full items-center gap-2 border-t border-gray-500 bg-gray-700 px-2 py-4 text-gray-300'
				}
			>
				<div className={'h-10 w-10 rounded-full bg-gray-300'}></div>
				<div>
					<p className={'text-sm font-medium text-white'}>Nom d'utilisateur</p>
					<p className='text-xs font-medium text-gray-300 hover:text-gray-200'>
						Se déconnecter
					</p>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
