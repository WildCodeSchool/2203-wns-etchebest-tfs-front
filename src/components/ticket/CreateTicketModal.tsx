import { Dispatch, SetStateAction, useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { CheckCircleIcon } from '@heroicons/react/outline'
import { useForm, SubmitHandler } from 'react-hook-form'

import Button from '../common/Button'
import { InputGroup } from '../common/form/input/InputGroup'
import { SelectGroup } from '../common/form/select/SelectGroup'
import Modal from '../common/modal/Modal'

import { GET_ME, GET_PROJECT } from '../../apollo/queries'
import { CREATE_TICKET } from '../../apollo/mutations'

import { isEmpty } from '../../utils/objectIsEmpty'

import { Priority, Ticket, ValidatorForm } from '../../types'
import TextareaGroup from '../common/form/TextareaGroup'
import { queries } from '@testing-library/react'

type CreateTicketForm = Pick<Ticket, 'title' | 'description' | 'priority'>
type ValidatorCreateTicket = ValidatorForm<keyof Omit<CreateTicketForm, 'description'>> // 'description' is not required

interface CreateTicketProps {
	projectId: string
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
}

export function CreateTicketModal({
	projectId,
	setIsOpenModal,
	isOpen
}: CreateTicketProps) {
	// ------------------ ADD ticket form -------------------
	const [isSubmited, setIsSubmited] = useState<boolean>(false)

	const {
		register,
		watch,
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
		priority: {
			required: {
				value: true,
				message: 'La priorité est requise'
			},
			validate: {
				rightValue: (value: string) => {
					return (
						value === Priority.LOW ||
						value === Priority.MEDIUM ||
						value === Priority.HIGH ||
						'La valeur doit être "Basse" ou "Moyenne" ou "Elevée"'
					)
				}
			}
		}
	}

	const close = () => {
		setIsOpenModal(false)
	}

	// -------------- Send ticket and get project after ticket is created ---------------------
	const [createTicketMutation, { data, loading, error: createTicketError }] = useMutation(
		CREATE_TICKET,
		{
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
		}
	)
	const { data: user, error: idUserError } = useQuery(GET_ME)

	const onSubmit: SubmitHandler<CreateTicketForm> = async payload => {
		//fetch user id from context

		if (!user?.me) {
			throw new Error("l'utilisateur doit être connecté ou avoir les droits")
		}
		const ticket = {
			...payload,
			project: {
				connect: {
					id: Number(projectId)
				}
			},
			user_author: {
				connect: {
					id: Number(user.me.id)
				}
			},
			time_estimation: '2022-10-18T14:11:53.030Z'
		}

		await createTicketMutation({ variables: { data: ticket } })
		if (!createTicketError) {
			setIsSubmited(true)
		}
	}

	// Modal content if ticket is created
	if (isSubmited) {
		return isOpen ? (
			<Modal close={close}>
				<CheckCircleIcon className='h-20 mx-auto mb-8 text-secondary' />
				<h2 className='text-2xl font-medium text-center text-primary'>
					Votre ticket a été créé
				</h2>
				<div className='flex justify-end gap-4 mt-4'>
					<Button
						outlined
						onClick={() => {
							setIsOpenModal(false), setIsSubmited(false)
						}}
					>
						Fermer
					</Button>
					<Button onClick={() => setIsSubmited(false)}>Créer un nouveau ticket</Button>
				</div>
			</Modal>
		) : null
	}

	// Modal content if ticket is not created
	return isOpen ? (
		<Modal close={close}>
			<div>
				<h2 className='text-2xl font-medium text-primary'>Ajouter un ticket</h2>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
					<InputGroup
						label='Titre'
						type='text'
						field='title'
						register={register}
						errors={errors}
						validator={validators}
						placeholder='Ajouter un titre'
					/>
					<TextareaGroup
						label='Description'
						placeholder='Veuillez saisir un sujet'
						name='description'
						register={register}
						watch={watch} 
						errors={errors}					
					/>
					<SelectGroup
						label='Priorité'
						field='priority'
						register={register}
						validator={validators}
						errors={errors}
						placeholder='Définir une priorité'
					>
						<option value={Priority.LOW} selected>
							Basse
						</option>
						<option value={Priority.MEDIUM}>Moyenne</option>
						<option value={Priority.HIGH}>Elevée</option>
					</SelectGroup>
					<div className='flex justify-end gap-4 mt-4'>
						<Button
							outlined
							onClick={() => {
								setIsOpenModal(false), setIsSubmited(false)
							}}
						>
							Annuler
						</Button>
						<Button disabled={!isEmpty(errors)} type='submit' loading={loading}>
							Ajouter le ticket
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	) : null
}
