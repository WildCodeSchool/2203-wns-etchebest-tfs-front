import { useContext } from 'react'

import { ExclamationCircleIcon, FolderOpenIcon, RefreshIcon } from '@heroicons/react/outline'

import StoreContext from '../../context/StoreContext'

import Button from '../Button'
import ProjectGridElement from './ProjectGridElement'
import ProjectListRow from './ProjectRowElement'


interface Project {
	createdAt: string
	id: number
	subject: String
}



export default function Projects({projects, error = false}: any) {

	const {projectView} = useContext(StoreContext)


	if (error) {
		if (error === 1) {
			return (
				<section className='bg-white border min-h-full border-grey-300 p-48 mt-5 flex justify-center items-center'>
					<div className={'flex flex-col items-center'}>
						<ExclamationCircleIcon className={'h-32 w-32 text-alert'} />
						<div className={'flex flex-col items-center mt-16'}>
							<p className={'font-medium text-grey-500 mb-4'}>The tickets could not be retrieved</p>
							<Button outlined={true}><><RefreshIcon className={'w-4 h-4'} /> Recharger</></Button>
						</div>
					</div>
				</section>
			)
		} else return (
			<section className='bg-white border min-h-full border-grey-300 p-48 mt-5 flex justify-center items-center'>
					<div className={'flex flex-col items-center'}>
						<FolderOpenIcon className={'h-32 w-32 text-primary'} />
						<div className={'flex flex-col items-center mt-16'}>
							<p className={'font-medium text-grey-500 mb-4'}>No project found</p>
							<Button outlined={true}>+ Ajouter un projet</Button>
						</div>
					</div>
				</section>
		)
	}

	return (
		<>
			{projectView.data === 'grid' ? (
				<section className='bg-white border min-h-full border-grey-300 p-12 mt-5 flex gap-6 flex-wrap'>
					{projects.map((project: any) => (
						<ProjectGridElement data={project} />
					))}
				</section>
			) : (
				<section className='bg-white border min-h-full border-grey-300 mt-5'>
					<div className="grid grid-cols-6 uppercase text-sm text-grey-400 font-semibold px-10 py-4 border-b border-grey-300">
						<div>
							Nom
						</div>
						<div>
							Membres
						</div>
						<div>
							Dernière MàJ
						</div>
						<div className={'text-center'}>
							Tickets ouverts
						</div>
						<div className={'text-center'}>
							Tickets en cours
						</div>
						<div className={'text-center'}>
							Tickets terminés
						</div>
					</div>
					{projects.map((project: any) => (
						<ProjectListRow data={project} />
					))}
				</section>
			)}
		</>
		
	)
}
