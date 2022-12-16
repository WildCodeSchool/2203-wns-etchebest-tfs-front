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
import { NoResultTicketTable } from '../../components/ticket/NoResultTicketTable'
//Librairies
import { useLazyQuery, useMutation } from '@apollo/client'
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline'
//Queries
import { GET_PROJECT } from '../../apollo/queries'
//Mutations
import { DELETE_PROJECT, DELETE_TICKET } from '../../apollo/mutations'
//Types
import { ProjectData, Status } from '../../types'
//Utils
import countTicketsByStatus from '../../utils/countTicketsStatus'
import formatDate from '../../utils/formatDate'
import { CreateOrAddLabel } from '../../components/ticket/label/inputLabel/CreateOrAddLabel'
import { castPriorityToEmoji } from '../../utils/castPriorityToEmoji'
import { statusTrad } from '../../utils/statusTrad'
import { useGuardByRoles } from '../../hooks/useGuardByRoles'
import { GUARD_ROUTES } from '../../GuardConfig'

const ProjectPage: NextPage = () => {
	const { authedUser, isAllow } = useGuardByRoles(GUARD_ROUTES.project.page, '/login')
	//Status de la modal de création de ticket
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	// Récupération de l'id du projet dans l'url
	const router = useRouter()
	const { project: projectId } = router.query
	//---------  Mutation pour supprimer le projet  ------------
	const [deleteProject, { loading: loadingDeleteProject }] = useMutation(DELETE_PROJECT, {
		onCompleted: () => router.push(`/`),
		onError: () => {
			throw new Error(`Impossible de supprimer le projet`)
		}
	})
	//---------  Mutation pour supprimer un ticket  ------------
	const [deleteTicket] = useMutation(DELETE_TICKET, {
		refetchQueries: [
			{
				query: GET_PROJECT,
				variables: {
					where: {
						id: Number(projectId)
					}
				}
			}
		]
	})
	//---------  Récupération des données du projet  ------------
	const [getProject, { data }] = useLazyQuery<ProjectData>(GET_PROJECT, {
		variables: {
			where: {
				id: Number(projectId)
			}
		}
	})

	useEffect(() => {
		console.log('test')
		getProject()
	}, [])

	//---------  Comptage des tickets par status  ------------
	const statusCount = {
		open: countTicketsByStatus(data?.project.tickets, Status.OPEN),
		wip: countTicketsByStatus(data?.project.tickets, Status.IN_PROGRESS),
		review: countTicketsByStatus(data?.project.tickets, Status.REVIEW),
		done: countTicketsByStatus(data?.project.tickets, Status.CLOSED)
	}

	//---------  Creation des data pour le tableau de tickets  ------------
	const tableHeaderItems = [
		'PRIORITY',
		'TITLE',
		'LABELS',
		'STATUS',
		'DERNIÈRE MÀJ',
		'AUTEUR',
		'ACTION'
	]

	const rowItems = data?.project.tickets.map(ticket => {
		const {
			id,
			priority,
			title,
			status,
			labels,
			updatedAt,
			user_author: { firstname }
		} = ticket
		const badges = labels.map((label, i) => <Badge key={i}>{label.name}</Badge>)

		return [
			id,
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
	const rowLinkPath = data?.project.tickets.map(ticket => {
		const { id: ticketId } = ticket
		const path = `${projectId}/${ticketId}`
		return path
	})

	//---------  Gestion des actions effectuées dans le tableau de projets  ------------
	function handleActionInTable(_: MouseEvent, action: 'delete' | 'edit', id: string) {
		switch (action) {
			case 'edit':
				console.log('edit')
				break
			case 'delete':
				deleteTicket({ variables: { where: { id: Number(id) } } })
				break
			default:
				throw new Error(`L'action '${action}' dans le tableau est inconnu`)
		}
	}

	function renderBtnActionByRole() {
		const variable = {
			variables: {
				where: {
					id: Number(projectId)
				}
			}
		}
		return (
			<>
				{authedUser && GUARD_ROUTES.project.actions.delete.includes(authedUser?.roles) && (
					<Button
						outlined
						alert
						onClick={() => deleteProject(variable)}
						loading={loadingDeleteProject}
						icon={<TrashIcon className='h-5' />}
					>
						Supprimer ce projet
					</Button>
				)}
				{authedUser && GUARD_ROUTES.ticket.actions.create.includes(authedUser?.roles) && (
					<Button
						onClick={() => setIsOpenModal(true)}
						icon={<PlusSmIcon className='h-5' />}
					>
						Ajouter un Ticket
					</Button>
				)}
			</>
		)
	}

	function tableActionByRoles() {
		//Si pas de user ou pas de droit pour delete et edit on retourne
		if (
			(!authedUser || !GUARD_ROUTES.ticket.actions.update.includes(authedUser.roles)) &&
			(!authedUser || !GUARD_ROUTES.ticket.actions.delete.includes(authedUser.roles))
		) {
			return null
		}
		return {
			edit:
				authedUser && GUARD_ROUTES.ticket.actions.update.includes(authedUser.roles)
					? true
					: false,
			delete:
				authedUser && GUARD_ROUTES.ticket.actions.delete.includes(authedUser.roles)
					? true
					: false,
			handleClick: (_: MouseEvent, action: 'delete' | 'edit', id: string) =>
				handleActionInTable(_, action, id)
		}
	}

	return (
		<div className={'bg-gray-50 flex min-h-screen flex-col justify-between'}>
			{isAllow && (
				<>
					<Head>
						<title>{data?.project.title}</title>
					</Head>
					<BaseLayout
						name={'Projet/' + data?.project.title || ''}
						button={renderBtnActionByRole()}
					>
						<ProjectItemOverview
							opened={statusCount.open}
							wip={statusCount.wip}
							review={statusCount.review}
							done={statusCount.done}
							subject={data?.project.subject || ''}
						/>
						<h2 className={'mb-2 mt-8 font-medium uppercase text-secondary'}>Tickets</h2>
						<section className='relative' id='table-project'>
							<TicketListFilters />
							<Table
								actions={tableActionByRoles()}
								headerItems={tableHeaderItems}
								rowItems={rowItems}
								rowLinkPath={rowLinkPath}
								noResultContent={
									<NoResultTicketTable
										projectName={data?.project.title}
										setIsOpenModal={setIsOpenModal}
									/>
								}
							/>
						</section>
					</BaseLayout>
				</>
			)}
		</div>
	)
}

export default ProjectPage
