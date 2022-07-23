import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Button from '../components/Button'

interface ILoginFormData {
	email: string
	password: string
}

const Login = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILoginFormData>()

	const router = useRouter()

	const onSubmit = handleSubmit(data => {
		console.log(data)
		router.push('/')
	})
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			<div>
				<label htmlFor='email'>Email</label>
				<input
					value={email}
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('email', {
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
					})}
					onChange={e => setEmail(e.target.value)}
				/>
				{errors.email && (
					<span className='text-red-500'>Adresse email non valide</span>
				)}
			</div>

			<div>
				<label htmlFor='password'>Mot de passe</label>
				<input
					value={password}
					type='password'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('password', { required: true })}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<Button type='submit'>Connexion</Button>
			</div>
		</form>
	)
}

export default Login
