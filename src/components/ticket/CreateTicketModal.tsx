import { Dispatch, SetStateAction, useState } from "react"
//Librairies
import { useMutation, useQuery } from "@apollo/client"
import { CheckCircleIcon } from "@heroicons/react/outline"
import { useForm, SubmitHandler } from "react-hook-form"
// Components
import Button from "../common/Button"
import { InputGroup } from "../common/form/input/InputGroup"
import { SelectGroup } from "../common/form/select/SelectGroup"
import Modal from "../common/modal/Modal"
// Queries
import { GET_ME } from "../../apollo/queries"
// Mutations
import { CREATE_TICKET } from "../../apollo/mutations"
// Utils
import { isEmpty } from "../../utils/objectIsEmpty"
// Types
import { Priority, Ticket, ValidatorForm } from "../../types"

type CreateTicketForm = Pick<Ticket, 'title' | 'description' | 'priority'>
type ValidatorCreateTicket = ValidatorForm<keyof CreateTicketForm>

interface CreateProjectProps {
	projectId: string
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	isOpen: boolean,
	updateParentData: Function
}

export function CreateTicketModal({ projectId, setIsOpenModal, isOpen,  updateParentData}: CreateProjectProps) {

 // ------------------ Formulaire de creation de ticket -------------------
	const [isSubmited, setIsSubmited] = useState<boolean>(false)

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
			},
			validate: {
				rightValue: (value: string) => {
					return (value === Priority.LOW || value === Priority.MEDIUM || value === Priority.HIGH)
					|| 
					'La valeur doit être "Basse" ou "Moyenne" ou "Elevée"'
				}		
			}
		}
	}


	const close= ()=> {
   setIsOpenModal(false)
	}

	// -------------- Envoi du ticket créé ---------------------
	const [createTicketMutation, {data, loading, error: createTicketError}] = useMutation(CREATE_TICKET)
	const {data: user, error:idUserError} = useQuery(GET_ME)

	const onSubmit: SubmitHandler<CreateTicketForm> = async payload => {
		//Récupération de l'id de l'utilisateur connecté

		if(!user?.me) {
			throw new Error("l'utilisateur doit être connecté ou avoir les droits");
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
			time_estimation: "2022-10-18T14:11:53.030Z"
		}
		
		await createTicketMutation({ variables: { data: ticket } })
		if(!createTicketError){
			setIsSubmited(true)
			updateParentData()
		}
	}

	// Contenu de la modal après avoir créé un ticket
 	if(isSubmited){
		return isOpen ? (
			<Modal close={close}>
				<CheckCircleIcon className='mx-auto mb-8 h-20 text-secondary'/>
				<h2  className='text-2xl text-center font-medium text-primary'>Votre ticket a été créé</h2>
				<div className='mt-4 flex justify-end gap-4'>
						<Button outlined onClick={() => {setIsOpenModal(false),setIsSubmited(false)}}>
							Fermer
						</Button>
						<Button onClick={()=> setIsSubmited(false) }>
							Créer un nouveau ticket
						</Button>
					</div>
			</Modal>
		) : null
	} 

	// Contenu de la modal pour créer un ticket
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
					<InputGroup
						label='Description'
						type='text'
						placeholder='Ajouter un description'
						field='description'
						register={register}
						errors={errors}
						validator={validators}
					/>
					<SelectGroup
						label='Priority'
						field='priority'
						register={register}
						validator={validators}
						errors={errors}
						placeholder='Définir une priorité'
					>
						<option value={Priority.LOW}>Basse</option>
            <option value={Priority.MEDIUM}>Moyenne</option>
            <option value={Priority.HIGH}>Elevée</option>
					</SelectGroup>
					<div className='mt-4 flex justify-end gap-4'>
						<Button outlined onClick={() => {setIsOpenModal(false),setIsSubmited(false)}}>
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