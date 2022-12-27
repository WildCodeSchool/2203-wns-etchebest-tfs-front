import { useState } from 'react'
import { ApolloError, gql, useLazyQuery, useMutation } from '@apollo/client'
import { CheckIcon } from '@heroicons/react/solid'
import { GET_TICKET } from '../../apollo/queries'
import delay from '../../utils/delay'

interface UserData {
	id: number
	firstname: string
	lastname: string
}

interface ComboboxProps {
	assignee: number | null
	users: UserData[]
	ticketId: number
}

export default function Combobox({ assignee, users, ticketId }: ComboboxProps) {
	const [query, setQuery] = useState('')
	const [selectedPerson, setSelectedPerson] = useState(assignee)

	const [touched, setTouched] = useState(false)

	// ---------------- Update from assigned user ---------------

	const UPDATE_USER_ASSIGNED = gql`
		mutation updateUserAssignId(
			$data: TicketUpdateInput!
			$where: TicketWhereUniqueInput!
		) {
			updateTicket(data: $data, where: $where) {
				id
				user_assign_id
			}
		}
	`
	function handleOnError(error: ApolloError) {
		if (error) {
			throw new Error(
				"Impossible de mettre à jour l'assignation du ticket | " + error.message
			)
		}
	}

	const [updateUserAssign, { loading }] = useMutation(UPDATE_USER_ASSIGNED, {
		onError: error => handleOnError(error),
		refetchQueries: [
			{
				query: GET_TICKET,
				variables: {
					where: {
						id: Number(ticketId)
					}
				}
			}
		]
	})

	// ---------------- Handle user search ---------------

	const editQuery = (query: string) => {
		setTouched(true)
		if (selectedPerson) {
			setSelectedPerson(null)
		}
		setQuery(query)
	}

	const filteredPeople =
		query === ''
			? users
			: users.filter((person: UserData) => {
					return `${person.firstname.toLowerCase()} ${person.lastname.toLowerCase()}`.includes(
						query.toLowerCase()
					)
			  })

	// --------------------------------------------

	const selectPerson = (person: number) => {
		setSelectedPerson(person)
		setTouched(false)

		updateUserAssign({
			variables: {
				data: {
					user_assign: {
						connect: {
							id: Number(person)
						}
					}
				},
				where: {
					id: ticketId
				}
			}
		})
	}

	const getSelectedPerson = (id: number) => {
		const selected = users.filter((person: UserData) => {
			return person.id === id
		})
		return `${selected[0]?.firstname ?? null} ${selected[0]?.lastname ?? null}`
	}

	return (
		<div className='relative h-full rounded-md shadow-sm'>
			<input
				type='text'
				name='search'
				id='search'
				className='block w-full h-full px-3 py-2 text-sm border rounded-sm border-grey-500 text-primary placeholder-grey-400 placeholder:text-sm focus:border-secondary focus:text-secondary focus:ring-grey-500'
				placeholder='Sélectionnez'
				onFocus={() => setTouched(true)}
				onBlur={async () => {
					await delay(250)
					setTouched(false)
				}}
				value={selectedPerson ? getSelectedPerson(selectedPerson) : query}
				onChange={event => editQuery(event.target.value)}
			/>
			{touched && (
				<div className='absolute w-full overflow-auto rounded-sm shadow max-h-96 bg-grey-50'>
					{filteredPeople.map((user: UserData) => (
						<div
							onClick={() => selectPerson(user.id)}
							className='flex items-center px-3 py-2 transition-all cursor-pointer w-100 hover:bg-secondary hover:text-white'
							key={user.id}
						>
							{user.id === selectedPerson && (
								<CheckIcon className='w-4 h-4 mr-1 text-primary' />
							)}
							{user.firstname} {user.lastname}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
