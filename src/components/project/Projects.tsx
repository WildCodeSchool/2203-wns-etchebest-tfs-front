import { Dispatch, SetStateAction, useContext, useState } from 'react'
//Libraries
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
//Context
import StoreContext from '../../context/StoreContext'
import { AuthContext } from '../../UserContext'
//Components
import ProjectGridElement from './ProjectGridElement'
import Table from '../common/table/Table'
import { NoResultProjectTable } from './NoResultProjectTable'
import TextareaGroup from '../common/form/TextareaGroup'
import { InputGroup } from '../common/form/input/InputGroup'
import Button from '../common/Button'
import Modal from '../common/modal/Modal'
//Mutations
import { DELETE_PROJECT, UPDATE_PROJECT } from '../../apollo/mutations'
//Queries
import { GET_PROJECTS } from '../../apollo/queries'
//Utils
import formatDate from '../../utils/formatDate'
import countTicketsByStatus from '../../utils/countTicketsStatus'
import { isEmpty } from '../../utils/objectIsEmpty'
//Types
import { Project, ValidatorForm } from '../../types'
//Config
import { GUARD_ROUTES } from '../../GuardConfig'

interface ProjectsProps {
	projects: Project[]
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function Projects({ projects, setIsOpenModal }: ProjectsProps) {
	const authCtx = useContext(AuthContext)

	const { projectView } = useContext(StoreContext)
	const [currentProjectEdit, setcurrentProjectEdit] = useState<Project>()
	const [deleteProject] = useMutation(DELETE_PROJECT, {
		refetchQueries: [{ query: GET_PROJECTS }, 'Projects']
	})

	// ---------- Element et manipulation du tableau de projet -------------------------
	//Nom des colonnes
	const tableHeaderItems = [
		'NOM',
		'MEMBRES',
		'DERNIÈRE MÀJ',
		'TICKETS OUVERT',
		'TICKETS EN COURS',
		'TICKETS TERMINÉS',
		'ACTION'
	]

	//Retourne un tableau imbriqué
	const tableRowItems = projects.map(project => {
		const { id, title, members, updatedAt, tickets } = project

		const lastUpdate = formatDate(updatedAt)

		const open = countTicketsByStatus(tickets, 'OPEN')
		const inProgress = countTicketsByStatus(tickets, 'IN_PROGRESS')
		const closed = countTicketsByStatus(tickets, 'CLOSED')

		return [id, title, members.length, lastUpdate, open, inProgress, closed]
	})

	// Tableau qui fournie les liens pour chaque ligne du tableau
	const rowLinkPath = projects.map(project => {
		const { id } = project
		return String(id)
	})

	function handleActionInTable(_: MouseEvent, action: 'delete' | 'edit', id: string) {
		if (action === 'delete') {
			deleteProject({
				variables: {
					where: {
						id: Number(id)
					}
				}
			})
			return
		} else if (action === 'edit') {
			const currentProject = projects.find(p => p.id === Number(id))
			if (!currentProject) {
				setIsOpenModalEdit(false)
				throw new Error('Impossible de récupérer les données pour ce project')
			}
			setcurrentProjectEdit(currentProject)
			setIsOpenModalEdit(true)
			return
		}
		throw new Error(`L'action '${action}' dans le tableau est inconnue`)
	}

	const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)

	function tableActionByRoles() {
		//Si pas de user ou pas de droit pour delete et edit on retourne
		if (
			(!authCtx?.authUser ||
				!GUARD_ROUTES.project.actions.update.includes(authCtx?.authUser.role)) &&
			(!authCtx?.authUser ||
				!GUARD_ROUTES.project.actions.delete.includes(authCtx?.authUser.role))
		) {
			return null
		}
		return {
			edit:
				authCtx?.authUser &&
				GUARD_ROUTES.project.actions.update.includes(authCtx?.authUser.role)
					? true
					: false,
			delete:
				authCtx?.authUser &&
				GUARD_ROUTES.project.actions.delete.includes(authCtx?.authUser.role)
					? true
					: false,
			handleClick: (_: MouseEvent, action: 'delete' | 'edit', id: string) =>
				handleActionInTable(_, action, id)
		}
	}

	return (
		<>
			{projectView.data === 'grid' ? (
				<section className='mt-4 flex min-h-full flex-wrap gap-6 border border-grey-300 bg-white p-12'>
					{projects.map((project: Project, i) => (
						<ProjectGridElement key={i} data={project} />
					))}
				</section>
			) : (
				<section className='mt-4 min-h-full '>
					<Table
						headerItems={tableHeaderItems}
						rowItems={tableRowItems}
						rowLinkPath={rowLinkPath}
						noResultContent={<NoResultProjectTable setIsOpenModal={setIsOpenModal} />}
						actions={tableActionByRoles()}
					/>
				</section>
			)}
			{isOpenModalEdit && (
				<UpdateProjectModal
					setIsOpenModal={setIsOpenModalEdit}
					isOpen={isOpenModalEdit}
					currentProject={currentProjectEdit}
				/>
			)}
		</>
	)
}

interface UpdateProjectModalProps {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
	currentProject: Project | undefined
}

type EditProjectForm = Pick<Project, 'title' | 'subject'>
type ValidatorProjectForm = ValidatorForm<keyof EditProjectForm>

function UpdateProjectModal({
	setIsOpenModal,
	isOpen,
	currentProject
}: UpdateProjectModalProps) {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<EditProjectForm>({
		mode: 'onTouched',
		defaultValues: {
			title: currentProject?.title,
			subject: currentProject?.subject
		}
	})

	const [EditProject] = useMutation(UPDATE_PROJECT, {
		onCompleted: () => setIsOpenModal(false),
		onError: e => {
			throw new Error(`Impossible de mettre à jour le projet ${currentProject?.title}`)
		}
	})

	function close() {
		setIsOpenModal(false)
	}

	const onSubmit: SubmitHandler<EditProjectForm> = async payload => {
		await EditProject({
			variables: {
				where: {
					id: currentProject?.id
				},
				data: {
					subject: {
						set: payload.subject
					},
					title: {
						set: payload.title
					}
				}
			}
		})
	}

	const validators: ValidatorProjectForm = {
		title: {
			required: {
				value: true,
				message: 'Le titre est requis'
			},
			maxLength: {
				value: 70,
				message: 'Le titre ne doit pas dépasser 70 caractères'
			}
		},
		subject: {
			required: {
				value: true,
				message: 'Le sujet est requis'
			},
			maxLength: {
				value: 255,
				message: 'Le sujet ne doit pas dépasser 255 caractères'
			}
		}
	}

	return isOpen ? (
		<Modal close={close}>
			<form onSubmit={handleSubmit(onSubmit)} className='mt-8'>
				<InputGroup
					label='Titre'
					type='text'
					field='title'
					helper='Ceci est un helper'
					register={register}
					errors={errors}
					validator={validators}
					placeholder='Ajouter un titre'
				/>
				<TextareaGroup
					label='Sujet'
					name='subject'
					placeholder='Veuillez saisir un sujet'
					register={register}
					validator={validators}
					errors={errors}
					watch={watch}
				/>
				<div className='mt-4 flex justify-end gap-4'>
					<Button
						outlined
						onClick={() => {
							setIsOpenModal(false)
						}}
					>
						Annuler
					</Button>
					<Button disabled={!isEmpty(errors)} type='submit'>
						Editer le projet
					</Button>
				</div>
			</form>
		</Modal>
	) : null
}
