import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Button from './Button'

interface IRegisterFormData {
	email: string
	password: string
	confirmPassword: string
}

const Register = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [confirmPassword, setConfirmPasword] = useState<string>('')

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors }
	} = useForm<IRegisterFormData>()

	const router = useRouter()

	const onSubmit = handleSubmit(data => {
		console.log(data)
		router.push('/')
	})

	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			<label htmlFor='email' className=' text-sm font-medium text-gray-700'>
				Email
			</label>
			<div>
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
					<p className='text-red-500'>Adresse email non valide</p>
				)}
			</div>

			<label htmlFor='password'>Mot de passe</label>
			<div>
				<input
					value={password}
					type='password'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('password', {
						required: true,
						minLength: 8,
						maxLength: 16
					})}
					onChange={e => setPassword(e.target.value)}
				/>
			</div>

			<label htmlFor='password'>Confirmez le mot de passe</label>
			<div>
				<input
					value={confirmPassword}
					type='password'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('password', {
						required: true,
						validate: (val: string) => {
							if (watch('password') != val) {
								return 'Les mots de passe ne correspondent pas'
							}
						}
					})}
					onChange={e => setConfirmPasword(e.target.value)}
				/>
			</div>
			<div>
				<Button type='submit'>S'inscrire</Button>
			</div>
		</form>
	)
}

export default Register
