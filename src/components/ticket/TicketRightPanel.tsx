import { ChangeEvent } from 'react'
import { ApolloError, gql, useMutation, useQuery } from '@apollo/client'

import { GET_USERS } from '../../apollo/queries'
import { Status, Ticket } from '../../types'

import { castPriorityToEmoji } from '../../utils/castPriorityToEmoji'
import formatDate from '../../utils/formatDate'
import { statusTrad } from '../../utils/statusTrad'

import Badge from '../common/badge/Badge'
import styles from '../common/form/input/InputGroup.module.css'
import { Loader } from '../common/Loader'
import Combobox from './Combobox'

const classes = {
	titles: 'text-grey-500 font-medium uppercase',
	subTitles: 'text-grey-500'
}

const TicketDataLine = ({ title, children }: any) => {
	return (
		<>
			<p className={classes.subTitles}>{title}</p>
			<span>{children}</span>
		</>
	)
}

const UserView = ({ children }: any) => {
	return (
		<div className={'inline-flex items-center'}>
			<span className={'mr-1 h-5 w-5 rounded-full bg-grey-500'}></span>
			{children}
		</div>
	)
}

interface TicketLeftPanelProps {
	ticket: Ticket
}

export default function TicketRightPanel({ ticket }: TicketLeftPanelProps) {
	const authorFullName = `${ticket.user_author.firstname} ${ticket.user_author.lastname}`

	// ---------------- Mise à jour du statut ---------------
	const UPDATE_STATUS = gql`
		mutation UpdateStatus($data: TicketUpdateInput!, $where: TicketWhereUniqueInput!) {
			updateTicket(data: $data, where: $where) {
				id
				status
			}
		}
	`

	const [updateStatus, { loading }] = useMutation(UPDATE_STATUS, {
		onError: error => handleOnError(error)
	})

	function handleOnError(error: ApolloError) {
		if (error) {
			throw new Error(
				'Impossible de mettre à jour le statut du ticket | ' + error.message
			)
		}
	}

	function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
		updateStatus({
			variables: {
				data: {
					status: {
						set: e.target.value
					}
				},
				where: {
					id: ticket.id
				}
			}
		})
	}

	// --------------------------------------------

	// Fourni les options du select
	// Récupère les status de l'enum Status et créé un tableau <option>{status}</option>
	type StatusKeys = keyof typeof Status
	const selectOptions = (Object.keys(Status) as StatusKeys[]).map(
		(statusKey, i): JSX.Element => {
			const { status: currentStatus } = ticket
			return (
				<option
					key={i}
					value={Status[statusKey]}
					className={
						currentStatus === Status[statusKey] ? 'font-bold text-primary' : 'text-sm'
					}
				>
					{statusTrad(Status[statusKey])}
				</option>
			)
		}
	)

	const { data: userList } = useQuery(GET_USERS)

	return (
		<div className={'relative h-full w-5/12 overflow-auto p-12'}>
			<div className={'grid grid-cols-2 gap-y-4'}>
				<p className={classes.titles}>Status: </p>
				<span className='relative'>
					{loading && (
						<Loader className=' absolute left-0 m-auto h-14 translate-x-[-100%] translate-y-[-10px] text-primary' />
					)}
					<select
						value={ticket.status}
						onChange={handleStatusChange}
						className={styles.input}
						disabled={loading}
					>
						{selectOptions}
					</select>
				</span>
			</div>
			<div className={'mt-12 grid grid-cols-2 gap-y-4'}>
				<TicketDataLine title={'Projet :'}>
					<p>{ticket.project.title}</p>
				</TicketDataLine>
				<TicketDataLine title={'Priorité :'}>
					<p>{castPriorityToEmoji(ticket.priority)}</p>
				</TicketDataLine>
				<TicketDataLine title={'Auteur :'}>
					<UserView>
						<p>{authorFullName}</p>
					</UserView>
				</TicketDataLine>
				<TicketDataLine title={'Assigné à :'}>
					<Combobox
						assignee={ticket?.user_assign?.id ?? null}
						users={userList?.users ?? []}
						ticketId={ticket.id}
					/>
				</TicketDataLine>
				<TicketDataLine title={'Labels :'}>
					{ticket.labels.map(label => (
						<Badge>{label.name}</Badge>
					))}
				</TicketDataLine>
				<div className={'col-span-2'}>
					<p className={classes.subTitles}>Estimation du temps :</p>
				</div>
				<div className={'col-span-2 flex justify-center'}>
					<div
						className={
							'flex h-40 w-40 items-center justify-center rounded-full bg-grey-500'
						}
						style={{
							background:
								'conic-gradient(from 90deg at 50% 50%, rgba(22, 78, 99, 1) 60%, rgba(13, 148, 136, 1) 60%, rgba(13, 148, 136, 1) 100%)'
						}}
					>
						<div>
							<p
								className={
									'flex h-32 w-32 items-center justify-center rounded-full bg-white text-sm'
								}
							>
								<span className={'text-secondary'}>13mins |</span>

								<span className={'ml-1 font-bold text-primary'}>20mins</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={'absolute bottom-0 left-6 pt-12 text-xs text-grey-500'}>
				<p>Créé le {formatDate(ticket.createdAt)}</p>
				<p>Mise à jour le {formatDate(ticket.updatedAt)}</p>
			</div>
		</div>
	)
}
