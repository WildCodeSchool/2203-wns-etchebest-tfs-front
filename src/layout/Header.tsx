import { ArrowSmLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

interface Properties {
	name: String
	button?: ReactElement
}

export default function Header(props: Properties): ReactElement {
	const { name, button } = props

	const router = useRouter()
	
	
	const backRoute = () => {
		const splitedRoute = router.asPath.split('/')
		splitedRoute.pop()
		if (splitedRoute.length === 1) {
			if (router.pathname === '/') {
				return ''
			} else {
				return '/'
			}
		} else {
			return splitedRoute.join('/')
		}

		
	}

	return (
		<div className={'relative pt-20'}>
			{backRoute() && (
				<Link href={backRoute()}>
				<a className={'flex items-center font-medium text-secondary absolute top-8'}>
					<ArrowSmLeftIcon className={'h-5 w-5'} /> 
					Retour
				</a>
			</Link>
			)}

			<div
				className={
					'flex w-full items-center justify-between relative'
				}
			>
				<div className={'flex flex-col text-primary font-medium text-4xl'}>
					{name}
				</div>
				<div className={'flex space-x-5'}>
					{button}
				</div>
			</div>
		</div>

	)
}
