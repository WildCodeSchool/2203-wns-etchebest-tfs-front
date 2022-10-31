import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
//Components
import BaseLayout from '../../layout/BaseLayout'
import Button from '../../components/Button'
import ProjectItemOverview from '../../components/project/ProjectItemOverview'
import Table from '../../components/common/table/Table'
import TicketListFilters from '../../components/ticketList/TicketListFilters'
import Badge from '../../components/common/badge/Badge'
import { InputGroup } from '../../components/common/form/input/InputGroup'
import Modal from '../../components/common/modal/Modal'
//Librairies
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from '@apollo/client'
import { PlusSmIcon } from '@heroicons/react/outline'
//Queries
import { GET_PROJECT } from '../../apollo/queries'
//Types
import { Priority, ProjectData, Status, Ticket, ValidatorForm } from '../../types'
//Utils
import countTicketsByStatus from '../../utils/countTicketsStatus'
import formatDate from '../../utils/formatDate'
import {isEmpty} from '../../utils/objectIsEmpty'

const ProjectPage: NextPage = () => {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	const router = useRouter()
	const { project: projectId } = router.query

	const { loading, error, data } = useQuery<ProjectData>(GET_PROJECT, {
		variables: {
			where: {
				id: Number(projectId)
			}
		}
	})

	const statusTrad = (status: Status) => {
		switch (status) {
			case 'OPEN':
				return 'Ouvert'
			case 'IN_PROGRESS':
				return 'En cours'
			case 'REVIEW':
				return 'En revue'
			case 'CLOSED':
				return 'Cloturé'
			default:
				return 'ERROR STATUS TRAD'
		}
	}
	const castPriorityToEmoji = (priority: Priority) => {
		switch (priority) {
			case 'LOW':
				return '🚀'
			case 'MEDIUM':
				return '🚀🚀'
			case 'HIGH':
				return '🚀🚀🚀'
			default:
				return 'ERROR PRIORITY CAST'
		}
	}

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

	const statusCount = {
		open: countTicketsByStatus(data?.project.tickets, 'OPEN'),
		wip: countTicketsByStatus(data?.project.tickets, 'IN_PROGRESS'),
		review: 10,
		done: countTicketsByStatus(data?.project.tickets, 'CLOSED')
		
	}



	return (
		<div className={'bg-gray-50 flex min-h-screen flex-col justify-between'}>
			<Head>
				<title>{data?.project.title}</title>
			</Head>
			<BaseLayout
				name={'Projet/' + data?.project.title || ''}
				button={<Button onClick={()=>setIsOpenModal(true)} icon={<PlusSmIcon className='h-5' />}>Ajouter un Ticket</Button>}
			>
				<>
					<ProjectItemOverview
						opened={statusCount.open}
						wip={statusCount.wip}
						review={statusCount.review}
						done={statusCount.done}
						cta={<Button outlined={true}>Last assigned ticket</Button>}
					/>
					<h2 className={'mb-2 mt-8 font-medium uppercase text-secondary'}>Tickets</h2>
					<section className='relative' id='table-project'>
						<TicketListFilters />
						<Table headerItems={tableHeaderItems} rowItems={rowItems} />
					</section>
					<CreateProjectModal setIsOpenModal={setIsOpenModal} isOpen={isOpenModal}/>
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectPage


// ---------------  Modal de creation de ticket  ----------------------------

type CreateTicketForm = Pick<Ticket, "title" | "description" | "priority" | "labels"  >
type ValidatorCreateTicket = ValidatorForm<keyof CreateTicketForm>

interface CreateProjectProps {
	setIsOpenModal:Dispatch<SetStateAction<boolean>>,
	isOpen:boolean
}

function CreateProjectModal({setIsOpenModal,isOpen}:CreateProjectProps) {
	
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateTicketForm>({ mode: 'onTouched' })

	const validators: ValidatorCreateTicket = {
		title: {
			required: {
				value: true,
				message: 'Le titre est requis'
			}
		},
		description: {
			required: {
				value: true,
				message: 'La desc est requise'
			}
		},
		priority: {
			required: {
				value: true,
				message: 'La priorité est requise'
			}
		},
		labels: {
			required: {
				value: true,
				message: 'Les est requis'
			}
		},
	
	}

	const onSubmit: SubmitHandler<CreateTicketForm> = payload => {
   console.log(payload.title)
	}
	
	return (isOpen ? <Modal>
		<div>
			<h2 className='text-2xl text-primary font-medium'>Ajouter un ticket</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
				<InputGroup type="text" label="Titre" placeholder='Ajouter un titre' field="title" register={register} errors={errors} validator={validators} />
				<InputGroup type="text" label="Description" placeholder='Ajouter un description' field="description" register={register} errors={errors} validator={validators} />
				<InputGroup type="text" label="Priority" placeholder='Définir une prio' field="priority" register={register} errors={errors} validator={validators} />
				<InputGroup type="text" label="Labels" placeholder='Ajouter des labels' field="labels" register={register} errors={errors} validator={validators} />
			</form>
		</div>
		<div className='flex mt-4 justify-end gap-4'>
			<Button  outlined onClick={()=>setIsOpenModal(false)}>Annuler</Button>
			<Button disabled={!isEmpty(errors)} type='submit' >Ajouter le ticket</Button>
		</div>
	</Modal> : null)
}
