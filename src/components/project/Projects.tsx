import { Dispatch, SetStateAction, useContext } from 'react'
//Libraries
import {
	ExclamationCircleIcon,
	FolderOpenIcon,
	RefreshIcon
} from '@heroicons/react/outline'
//Context
import StoreContext from '../../context/StoreContext'
//Components
import Button from '../common/Button'
import ProjectGridElement from './ProjectGridElement'
import formatDate from '../../utils/formatDate'
import Table from '../common/table/Table'
//Utils
import countTicketsByStatus from '../../utils/countTicketsStatus'
//Types
import { Project } from '../../types'
import { NoResultProjectTable } from './NoResultProjectTable'


interface ProjectsProps {
	projects: Project[]
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function Projects({ projects, setIsOpenModal }: ProjectsProps) {
	
	const { projectView } = useContext(StoreContext)

	//Nom des colonnes
	const tableHeaderItems = ["NOM","MEMBRES","DERNIÈRE MÀJ","TICKETS OUVERT","TICKETS EN COURS", "TICKETS TERMINÉS"]

	//Retourne un tableau imbriqué
  const tableRowItems = projects.map((project) => {
    const {title, members, updatedAt, tickets } = project
		
		const lastUpdate = formatDate(updatedAt)
		
		const open = countTicketsByStatus(tickets, "OPEN")
		const inProgress = countTicketsByStatus(tickets, "IN_PROGRESS")
		const closed = countTicketsByStatus(tickets, "CLOSED")

    return [title, members.length, lastUpdate, open, inProgress, closed]
  })

  // Tableau qui fournie les liens pour chaque ligne du tableau
  const rowLinkPath = projects.map((project) => {
    const {id } = project
    return String(id)
  })

	return (
		<>
			{projectView.data === 'grid' ? (
				<section className='mt-4 flex min-h-full flex-wrap gap-6 border border-grey-300 bg-white p-12'>
					{projects.map((project: Project, i) => (
						<ProjectGridElement key={i} data={project} />
					))}
				</section>
			) 
			: 
			(
				<section className='mt-4 min-h-full '>
					<Table headerItems={tableHeaderItems} rowItems={tableRowItems} rowLinkPath={rowLinkPath} noResultContent={<NoResultProjectTable  setIsOpenModal={setIsOpenModal}/>}/>
				</section>
			)}
		</>
	)
}
