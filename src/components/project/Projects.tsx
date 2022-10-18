import { useContext } from 'react'
//Libraries
import {
	ExclamationCircleIcon,
	FolderOpenIcon,
	RefreshIcon
} from '@heroicons/react/outline'
//Context
import StoreContext from '../../context/StoreContext'
//Components
import Button from '../Button'
import ProjectGridElement from './ProjectGridElement'
import formatDate from 'src/utils/formatDate'
import Table from '../common/table/Table'
import { IProject } from 'src/pages'


interface IProjectsProps {
	projects: IProject[]
	error?: boolean | number
}

export default function Projects({ projects, error = false }: IProjectsProps) {
	
	const { projectView } = useContext(StoreContext)

	//Nom des colonnes
	const tableHeaderItems = ["NOM","MEMBRES","DERNIÈRE MÀJ","TICKETS OUVERT","TICKETS EN COURS", "TICKETS TERMINÉS"]

	//Retourne un tableau imbriqué
  const tableRowItems = projects.map((project) => {
    const {title, members, updatedAt, tickets } = project
		
		//Filtre les status des tickets et retourne le nombre pour chaque type de status
		const {length: open} = tickets.filter(ticket => ticket.status === "OPEN" )
		const {length: inProgress} = tickets.filter(ticket => ticket.status === "IN_PROGRESS" )
		const {length: closed} = tickets.filter(ticket => ticket.status === "CLOSED" )

    return [title, members.length, formatDate(updatedAt), open, inProgress, closed]
  })

  // Tableau qui fournie les liens pour chaque ligne du tableau
  const rowLinkPath = projects.map((project) => {
    const {id } = project
    return String(id)
  })

	if (error) {
		if (error === 1) {
			return (
				<section className='mt-5 flex min-h-full items-center justify-center border border-grey-300 bg-white p-48'>
					<div className='flex flex-col items-center'>
						<ExclamationCircleIcon className='h-32 w-32 text-alert' />
						<div className='mt-16 flex flex-col items-center'>
							<p className='mb-4 font-medium text-grey-500'>
								The tickets could not be retrieved
							</p>
							<Button outlined={true}>
								<>
									<RefreshIcon className='h-4 w-4' /> Recharger
								</>
							</Button>
						</div>
					</div>
				</section>
			)
		} else
			return (
				<section className='mt-5 flex min-h-full items-center justify-center border border-grey-300 bg-white p-48'>
					<div className={'flex flex-col items-center'}>
						<FolderOpenIcon className={'h-32 w-32 text-primary'} />
						<div className={'mt-16 flex flex-col items-center'}>
							<p className={'mb-4 font-medium text-grey-500'}>No project found</p>
							<Button outlined={true}>+ Ajouter un projet</Button>
						</div>
					</div>
				</section>
			)
	}

	return (
		<>
			{projectView.data === 'grid' ? (
				<section className='mt-4 flex min-h-full flex-wrap gap-6 border border-grey-300 bg-white p-12'>
					{projects.map((project: IProject, i) => (
						<ProjectGridElement key={i} data={project} />
					))}
				</section>
			) : (
				<section className='mt-4 min-h-full '>
					<Table headerItems={tableHeaderItems} rowItems={tableRowItems} rowLinkPath={rowLinkPath}/>
				</section>
			)}
		</>
	)
}
