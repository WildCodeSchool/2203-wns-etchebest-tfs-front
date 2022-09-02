import React, { useState } from 'react'
import { useRouter } from 'next/router'
//Librarie
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
//Component
import Button from './Button'
//Queries
import { REGISTER_USER } from '../apollo/queries'



interface IRegisterFormData {
	firstname: string
	lastname: string
	email: string
	password: string
	confirmPassword: string
}


export function Register() {

	const initialValue = {
		firstname: 'Geoffrey',
		lastname: 'Morizot',
		email: 'gm@test.com',
		password: '00000000',
		confirmPassword: '00000000'
	}
	

	const [userInfo, setUserInfo] = useState<IRegisterFormData>(initialValue) 
	const { register, handleSubmit, formState: { errors } } = useForm<IRegisterFormData>({ mode: 'onTouched' })
	const [mutateRegister, { data, loading, error }] = useMutation(REGISTER_USER)


	const router = useRouter()


	 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target
			setUserInfo({
				...userInfo,
				[name]: value
			})
		}

	const onSubmit = handleSubmit(() => {
		const { confirmPassword, ...rest } = userInfo

		const response = mutateRegister({ variables: { data: rest } })
		response
			.then(data => {
				if (data) {
					console.log(data.data.register)
					localStorage.setItem('token', data.data.register)
					router.push("/")
				}
			})
			.catch(err => {
				console.log(err)
			})
	})


	if (loading) return <div>'Submitting...'</div>
	if (error) return <div>`Submission error! ${error.message}`</div>

	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			<div>
				<label htmlFor='firstname'>Firstname</label>
				<input
					value={userInfo.firstname}
					placeholder='John'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('firstname', {
						required: true,
						pattern: /[A-Za-z]$/g,
						minLength: 2
					})}
					onChange={handleInputChange}
				/>
				{errors.firstname && errors.firstname.type === 'minLength' && (
					<span className='text-sm text-red-500'>
						Votre nom doit comporter minimum 2 caractères
					</span>
				)}
				{errors.firstname && errors.firstname.type === 'pattern' && (
					<span className='text-sm text-red-500'>
						Votre nom doit comporter des lettres
					</span>
				)}
				{errors.firstname && errors.firstname.type === 'required' && (
					<span className='text-sm text-red-500'>Votre nom est requis</span>
				)}
			</div>

			<div>
				<label htmlFor='lastname'>Lastname</label>
				<input
					value={userInfo.lastname}
					placeholder='John'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('lastname', {
						required: true,
						pattern: /[A-Za-z]$/g,
						minLength: 2
					})}
					onChange={handleInputChange}
				/>
				{errors.lastname && (
					<span className='text-sm text-red-500'>Lastname non valide.</span>
				)}
			</div>

			<div>
				<label htmlFor='email'>Email</label>
				<input
					value={userInfo.email}
					placeholder='email@exemple.com'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('email', {
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
					})}
					onChange={handleInputChange}
				/>
				{errors.email && errors.email.type === 'pattern' && (
					<span className='text-sm text-red-500'>
						Adresse email non valide.
					</span>
				)}
				{errors.email && errors.email.type === 'required' && (
					<span className='text-sm text-red-500'>Adresse email requise</span>
				)}
			</div>

			<div>
				<label htmlFor='password'>Mot de passe</label>
				<input
					value={userInfo.password}
					type='password'
					placeholder='Saisissez votre mot de passe'
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
					onChange={handleInputChange}
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
					value={userInfo.confirmPassword}
					type='password'
					placeholder='Confirmez le mot de passe'
					className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					{...register('confirmPassword', {
						required: true,
						minLength: {
							value: 8,
							message: 'Le mot de passe doit contenir au moins 8 caractères.'
						},
						validate: value =>
							value === userInfo.password || 'Les mots de passe ne correspondent pas'
					})}
					onChange={handleInputChange}
				/>
				{errors.confirmPassword && (
					<span className='text-sm text-red-500'>
						{errors.confirmPassword.message}
					</span>
				)}
			</div>

			<Button type='submit'>S'inscrire</Button>
		</form>
	)
}

