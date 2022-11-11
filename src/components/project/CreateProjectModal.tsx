import { useLazyQuery, useMutation } from "@apollo/client"
import { CheckCircleIcon } from "@heroicons/react/outline"
import { Dispatch, SetStateAction, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { GET_ME, CREATE_PROJECT } from "../../apollo/queries"
import { Project, ValidatorForm, MeData } from "../../types"
import { isEmpty } from "../../utils/objectIsEmpty"
import Button from "../Button"
import { InputGroup } from "../common/form/input/InputGroup"
import Modal from "../common/modal/Modal"



interface CreateProjectModalProps {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
}
//Types qui concernent les enfants de CreateProjectModal
interface CreateProjectChildProps {
	setIsSubmited: Dispatch<SetStateAction<boolean>>
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
}
//-------------------------------------
type CreateProjectForm = Pick<Project, 'title'| 'subject' | 'code'>
type ValidatorProjectForm = ValidatorForm<keyof CreateProjectForm>




export default function CreateProjectModal({ setIsOpenModal, isOpen }: CreateProjectModalProps) {

	const close = () => setIsOpenModal(false)
	const [isSubmited, setIsSubmited] = useState<boolean>(false)

	return isOpen ? (
		<Modal close={close}>
			{isSubmited && <CreateProjectSucess setIsSubmited={setIsSubmited} setIsOpenModal={setIsOpenModal}/>}
			{!isSubmited && <CreateProjectForm setIsSubmited={setIsSubmited} setIsOpenModal={setIsOpenModal}/>}
		</Modal>
	) : null
}

// Intérieur de la modale pour la creation d'un projet
function CreateProjectForm({setIsSubmited, setIsOpenModal}:CreateProjectChildProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProjectForm>({ mode: 'onTouched'})

	const validators: ValidatorProjectForm = {
		title: {
			required: {
				value: true,
				message: 'Le titre est requis'
			}
		},
		subject: {
			required: {
				value: true,
				message: 'Le sujet est requis'
			}
		},
		code: {
			minLength: {
				value: 3,
				message: 'Le code doit faire 3 caractères'
			},
			maxLength: {
				value: 3,
				message: 'Le code doit faire 3 caractères'
			},
			required: {
				value: true,
				message: 'Le code est requis'
			}
		}
	}

// -------------- Envoi du projet créé  ---------------------
// Récupère l'utilisateur courant puis envoi du nouveau projet
	const [getMe,{loading: loadingGetId}] = useLazyQuery<MeData>(GET_ME)
	const [createProjectMutation, { loading: loadingCreateProject }] = useMutation(CREATE_PROJECT, {onCompleted: () => setIsSubmited(true)})
	
	const onSubmit: SubmitHandler<CreateProjectForm> = async (payload) => {

		await getMe()
						.then(({data})=>cBCreateProject(data,payload))
						.catch(()=>{throw new Error("Vous devez avoir les droits ou être connecté pour créer un projet")})
		
		async function cBCreateProject(data:MeData | undefined,payload:CreateProjectForm) {
			if(!data) throw new Error("Vous devez avoir les droits ou être connecté pour créer un projet");
			const project =  {
				...payload,
				user_author_project: {
					connect: {
						id: data?.me.id
					}
				}
			}
			await createProjectMutation({ variables: { data: project } })
		}
	}

	return (<div>
		<h2 className='text-2xl font-medium text-primary'>Ajouter un projet</h2>
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
				label='Sujet'
				type='text'
				field='subject'
				register={register}
				errors={errors}
				validator={validators}
				placeholder='Ajouter un sujet'
			/>
			<InputGroup
				label='Code'
				type='text'
				field='code'
				register={register}
				errors={errors}
				validator={validators}
				placeholder='Ajouter un code'
			/>
			<div className="mt-4 flex justify-end gap-4">
				<Button outlined onClick={() => {setIsOpenModal(false),setIsSubmited(false)}}>
						Annuler
				</Button>
				<Button disabled={!isEmpty(errors)} type='submit' loading={loadingCreateProject || loadingGetId }>Ajouter le projet</Button>
			</div>
		</form>
	</div>)
}

// Intérieur de la modale en cas de succès
function CreateProjectSucess({setIsSubmited, setIsOpenModal}: CreateProjectChildProps) {
	return (
		<div>
			<CheckCircleIcon className='mx-auto mb-8 h-20 text-secondary' />
			<h2 className='text-center text-2xl font-medium text-primary'>
				Votre projet a été créé
			</h2>
			<div className='mt-4 flex justify-end gap-4'>
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
		</div>
	)
}
