import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
//Components
import BaseLayout from '../../layout/BaseLayout'
import Button from '../../components/Button'
import TicketList from '../../components/ticketList/TicketList'
import ProjectItemOverview from '../../components/project/ProjectItemOverview'
import Table from '../../components/common/table/Table'
import TicketListFilters from '../../components/ticketList/TicketListFilters'
import Badge from '../../components/common/badge/Badge'
//Librairies
import { useQuery } from '@apollo/client'
import { PlusSmIcon } from '@heroicons/react/outline'
//Queries
import { GET_PROJECT } from '../../apollo/queries'
//Types
import { Priority, ProjectData, Status} from '../../types'
//Utils
import countTicketsByStatus from '../../utils/countTicketsStatus'
import formatDate from '../../utils/formatDate'


const ProjectPage: NextPage = () => {

	const router = useRouter()
  const  {project: projectId}  = router.query

	const { loading, error, data } = useQuery<ProjectData>(GET_PROJECT, {
		variables:
		 {
			where: {
				id: Number(projectId)
			}
		 },
	})
  
	const statusTrad = (status: Status)=> {
		switch (status) {
			case "OPEN": return "Ouvert"
			case "IN_PROGRESS": return "En cours"
			case "REVIEW": return "En revue"
			case "CLOSED": return "Cloturé"
			default: return "ERROR STATUS TRAD"
		}
	}
	const castPriorityToEmoji = (priority:Priority) => {
		switch (priority) {
			case "LOW": return "🚀"
			case "MEDIUM": return "🚀🚀"
			case "HIGH": return "🚀🚀🚀"
			default: return "ERROR PRIORITY CAST"
		}
	}

	const tableHeaderItems = ["PRIORITY","TITLE","LABELS","STATUS","DERNIÈRE MÀJ", "AUTEUR"]
	 
	const rowItems = data?.project.tickets.map(ticket => {

		const {priority, title, status, labels, updatedAt, user_author:{firstname}} = ticket
		const badges = labels.map((label,i)=><Badge key={i}>{label.name}</Badge>)

		return [castPriorityToEmoji(priority), title, badges , statusTrad(status), formatDate(updatedAt),firstname]
	})

	const statusCount = {
		open : countTicketsByStatus(data?.project.tickets,"OPEN"),
		wip : countTicketsByStatus(data?.project.tickets,"IN_PROGRESS"),
		review : 10,
		done : countTicketsByStatus(data?.project.tickets,"CLOSED")
	}

	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>{data?.project.title}</title>
			</Head>
			<BaseLayout name={"Projet/" + data?.project.title || ""} button={<Button icon={<PlusSmIcon className="h-5"/>}>Ajouter un Ticket</Button>}>
				<>
					<ProjectItemOverview 
						opened={statusCount.open} 
						wip={statusCount.wip} 
						review={statusCount.review} 
						done={statusCount.done} 
						cta={<Button outlined={true}>Last assigned ticket</Button>} 
					/>
					<h2 className={'text-secondary uppercase font-medium mb-2 mt-8'}>Tickets</h2>
					<section>
						<TicketListFilters/>
						<Table headerItems={tableHeaderItems} rowItems={rowItems}/>
					</section>
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectPage
