import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
//Components
import BaseLayout from '../../layout/BaseLayout'
import Button from '../../components/common/Button'
import ProjectItemOverview from '../../components/project/projectOverview/ProjectItemOverview'
import Table from '../../components/common/table/Table'
import TicketListFilters from '../../components/ticket/TicketListFilters'
import Badge from '../../components/common/badge/Badge'
import { CreateTicketModal } from '../../components/ticket/CreateTicketModal'
import {NoResultTicketTable} from '../../components/ticket/NoResultTicketTable'
//Librairies
import { useLazyQuery, useMutation } from '@apollo/client'
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline'
//Queries
import { GET_PROJECT } from '../../apollo/queries'
//Mutations
import { DELETE_PROJECT } from '../../apollo/mutations'
//Types
import { ProjectData, Status } from '../../types'
//Utils
import countTicketsByStatus from '../../utils/countTicketsStatus'
import formatDate from '../../utils/formatDate'
import { CreateOrAddLabel } from '../../components/ticket/label/inputLabel/CreateOrAddLabel'
import { castPriorityToEmoji } from '../../utils/castPriorityToEmoji'
import { statusTrad } from '../../utils/statusTrad'


const ProjectPage: NextPage = () => {
	//Status de la modal de création de ticket
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const router = useRouter()
	const { project: projectId } = router.query

	const [deleteProject, {loading: loadingDelete}] = useMutation(DELETE_PROJECT, {
		onCompleted: () => router.push(`/`),
		onError: ()=> {throw new Error(`Impossible de supprimer le projet`)},
		})


	const [getProjects,{ data }] = useLazyQuery<ProjectData>(GET_PROJECT, {
		variables: {
			where: {
				id: Number(projectId)
			}
		}
	})

	useEffect(() => {
		getProjects()
	}, [])
	

	 async function updateData(){
		console.log("update")
		await getProjects()
	}

	const statusCount = {
		open: countTicketsByStatus(data?.project.tickets, Status.OPEN),
		wip: countTicketsByStatus(data?.project.tickets, Status.IN_PROGRESS),
		review: countTicketsByStatus(data?.project.tickets, Status.REVIEW),
		done: countTicketsByStatus(data?.project.tickets, Status.CLOSED)
	}
	//------------------------------------------------------------------------

	//---------  Creation des data pour le tableau de tickets  ------------
	const tableHeaderItems = [
		'PRIORITY',
		'TITLE',
		'LABELS',
		'STATUS',
		'DERNIÈRE MÀJ',
		'AUTEUR'
	]

	const rowItems = data?.project.tickets.map(ticket => {
		const {
			priority,
			title,
			status,
			labels,
			updatedAt,
			user_author: { firstname }
		} = ticket
		const badges = labels.map((label, i) => <Badge key={i}>{label.name}</Badge>)

		return [
			castPriorityToEmoji(priority),
			title,
			badges,
			statusTrad(status),
			formatDate(updatedAt),
			firstname
		]
	})

	// Tableau qui fournie les liens pour chaque ligne du tableau
	// return "/[projectId}/[ticketId]"
	const rowLinkPath = data?.project.tickets.map((ticket) => {
		const {id: ticketId } = ticket
		const path = `${projectId}/${ticketId}` 
		return path
	})
//------------------------------------------------------------------------

 
	const headerButton = () => {
		const variable = {
			variables: {
				where: {
					id: Number(projectId)
				}
			}
		}
		return(
			<>
				<Button 
					outlined 
					alert
					onClick={() => deleteProject(variable)}
					loading={loadingDelete}
					icon={<TrashIcon className='h-5' />}
				>
						Supprimer ce projet
				</Button>
				<Button onClick={() => setIsOpenModal(true)} icon={<PlusSmIcon className='h-5' />}>Ajouter un Ticket</Button>
			</>
		)
	}

	return (
		<div className={'bg-gray-50 flex min-h-screen flex-col justify-between'}>
			<Head>
				<title>{data?.project.title}</title>
			</Head>
			<BaseLayout
				name={'Projet/' + data?.project.title || ''}
				button={
					headerButton()
				}
			>
				<>
				<CreateOrAddLabel/>
					<ProjectItemOverview
						opened={statusCount.open}
						wip={statusCount.wip}
						review={statusCount.review}
						done={statusCount.done}
						cta={<Button outlined>Last assigned ticket</Button>}
					/>
					<h2 className={'mb-2 mt-8 font-medium uppercase text-secondary'}>Tickets</h2>
					<section className='relative' id='table-project'>
						<TicketListFilters />
						<Table headerItems={tableHeaderItems} rowItems={rowItems} rowLinkPath={rowLinkPath} noResultContent={<NoResultTicketTable projectName={data?.project.title} setIsOpenModal={setIsOpenModal}/>} />
					</section>
					<CreateTicketModal setIsOpenModal={setIsOpenModal} updateParentData={updateData} projectId={projectId as string} isOpen={isOpenModal}/>
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectPage
