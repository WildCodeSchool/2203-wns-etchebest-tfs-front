import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

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
		handleSubmit,
		formState: { errors }
	} = useForm<IRegisterFormData>({
		mode: 'onTouched'
	})

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
					placeholder='email'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('email', {
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
					})}
					onChange={e => setEmail(e.target.value)}
				/>
				{errors.email && (
					<span className='text-sm text-red-500'>
						Adresse email non valide.
					</span>
				)}
			</div>

			<div>
				<label htmlFor='password'>Mot de passe</label>
				<input
					value={password}
					type='password'
					placeholder='password'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('password', {
						required: true,
						minLength: {
							value: 8,
							message: 'Le mot de passe doit contenir au moins 8 caractères.'
						},
						maxLength: {
							value: 20,
							message: 'Le mot de passe ne doit pas dépasser 20 caractères.'
						}
					})}
					onChange={e => setPassword(e.target.value)}
				/>
				{errors.password && (
					<span className='text-sm text-red-500'>
						{errors.password.message}
					</span>
				)}
			</div>

			<div>
				<label htmlFor='password'>Confirmez le mot de passe</label>
				<input
					value={confirmPassword}
					type='password'
					placeholder='confirmez le mot de passe'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('confirmPassword', {
						required: true,
						validate: value =>
							value === password || 'Les mots de passe ne correspondent pas'
					})}
					onChange={e => setConfirmPasword(e.target.value)}
				/>
			</div>
			{errors.confirmPassword && (
				<span className='text-sm text-red-500'>
					{errors.confirmPassword.message}
				</span>
			)}
			<div>
				<Button type='submit'>S'inscrire</Button>
			</div>
			<div className='absolute top-1 right-5'>
				<AiFillEyeInvisible />
				<AiFillEye />
			</div>
		</form>
	)
}

export default Register
