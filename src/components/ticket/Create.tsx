import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ReactElement } from 'react'
import Button from '../Button'
// import formatDate from '../../utils/formatDate/formatDate'

interface ICreateTicket {
	title: string // form
	project: string // form
	description: string // form
	assigned: string // placeholder
	status: string // To do
	createdAt: string // Date.Now()
	user: string // placeholder
}

const CreateTicket = (): ReactElement => {
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [assigned, setAssigned] = useState<string>('')
	const [project, setProject] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ICreateTicket>()

	const onSubmit = handleSubmit(data => {
		data.status = 'Todo'
		data.user = 'session.userId'
		console.log(data)
	})

	return (
		<form onSubmit={onSubmit}>
			<div>
				<label htmlFor='title'>Titre</label>
				<input
					value={title}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('title', {
						required: true
					})}
					onChange={e => setTitle(e.target.value)}
				/>
				{errors.title && <span className='text-red-500'>Titre non valide</span>}
			</div>

			<div>
				<label htmlFor='description'>Description</label>
				<input
					value={description}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('description', {
						required: true
					})}
					onChange={e => setDescription(e.target.value)}
				/>
				{errors.description && (
					<span className='text-red-500'>Description non valide</span>
				)}
			</div>

			<div>
				<label htmlFor='project'>projet</label>
				<input
					value={project}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('project', {
						required: true
					})}
					onChange={e => setProject(e.target.value)}
				/>
				{errors.project && (
					<span className='text-red-500'>projet non valide</span>
				)}
			</div>

			<div>
				<label htmlFor='assigned'>Pour qui qu'ché?</label>
				<input
					value={assigned}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('assigned', {})}
					onChange={e => setAssigned(e.target.value)}
				/>
				{errors.assigned && (
					<span className='text-red-500'>Ticket non Assigné</span>
				)}
			</div>

			<div>
				<Button type='submit'>Enregistrer</Button>
			</div>
		</form>
	)
}

CreateTicket.defaultProps = {
	type: 'text',
	required: false
}

export default CreateTicket
