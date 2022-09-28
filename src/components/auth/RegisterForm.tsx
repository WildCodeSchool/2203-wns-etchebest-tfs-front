import React from 'react'
import { useRouter } from 'next/router'
//Libraries
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
//Component
import Button from '../Button'
import { ErrorInput } from '../common/form/ErrorInput'
//Styles
import styles from './LoginForm.module.css'
//Queries
import { REGISTER_USER } from '../../apollo/queries'
//Utils
import { isEmpty } from '../../utils/objectIsEmpty'

interface IRegisterFormData {
	firstname: string
	lastname: string
	email: string
	password: string
	confirmPassword: string
}

export function RegisterForm() {
	//Form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IRegisterFormData>({ mode: 'onTouched' })
	const validators = {
		firstname: {
			required: {
				value: true,
				message: 'Le prénom est requis'
			},
			pattern: {
				value: /[A-Za-z]$/g,
				message: 'Le prénom doit comporter uniquement des lettres'
			},
			minLength: {
				value: 2,
				message: 'Le prénom doit faire au moins 2 caractères'
			}
		},
		lastname: {
			required: {
				value: true,
				message: 'Le nom est requis'
			},
			pattern: {
				value: /[A-Za-z]$/g,
				message: 'Le nom doit comporter uniquement des lettres'
			},
			minLength: {
				value: 2,
				message: 'Le nom doit faire au moins 2 caractères'
			}
		},
		email: {
			required: {
				value: true,
				message: "L'email est requis"
			},
			pattern: {
				value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				message: 'Adresse email non valide'
			}
		},
		password: {
			required: {
				value: true,
				message: 'Le mot de passe est requis'
			},
			minLength: {
				value: 8,
				message: 'Le mot de passe doit contenir au moins 8 caractères.'
			},
			maxLength: {
				value: 20,
				message: 'Le mot de passe ne doit pas dépasser 20 caractères.'
			}
		},
		confirmPassword: {
			required: {
				value: true,
				message: 'La confirmation mot de passe est requise'
			},
			minLength: {
				value: 8,
				message: 'Le mot de passe doit contenir au moins 8 caractères.'
			},
			validate: (value: string) => value === watch('password'),
			message: 'Les mots de passe ne correspondent pas'
		}
	}

	//Mutation
	const [mutateRegister, { data, loading, error: ApolloError }] =
		useMutation(REGISTER_USER)

	const router = useRouter()

	const onSubmit = handleSubmit(data => {
		// on enlève confirmPassword de l'objet data
		const { confirmPassword, ...rest } = data

		const response = mutateRegister({ variables: { data: rest } })
		response
			.then(data => {
				if (data) {
					console.log(data.data.register)
					localStorage.setItem('token', data.data.register)
					router.push('/')
				}
			})
			.catch(err => {
				console.log(err)
			})
	})

	return (
		<form className='grid grid-cols-2 gap-3 ' onSubmit={onSubmit}>
			{/* firstname */}
			<div className='col-span-1'>
				<label htmlFor='firstname' className={styles.label}>
					Firstname
				</label>
				<input
					id='firstname'
					type="text"
					aria-invalid={errors.firstname ? 'true' : 'false'}
					placeholder='John'
					className={styles.input}
					{...register('firstname', validators.firstname)}
					autoComplete='given-name'
				/>
				{errors.firstname && <ErrorInput errors={errors} field='firstname' />}
			</div>

			{/* lastname */}
			<div className='col-span-1'>
				<label htmlFor='lastname' className={styles.label}>
					Lastname
				</label>
				<input
					id='lastname'
					type="text"
					aria-invalid={errors.lastname ? 'true' : 'false'}
					placeholder='John'
					className={styles.input}
					{...register('lastname', validators.lastname)}
					autoComplete='family-name'
				/>
				{errors.lastname && <ErrorInput errors={errors} field='lastname' />}
			</div>

			{/* Email */}
			<div className='col-span-2'>
				<label htmlFor='email' className={styles.label}>
					Email
				</label>
				<input
					id='email'
					type="email"
					aria-invalid={errors.email ? 'true' : 'false'}
					placeholder='email@exemple.com'
					className={styles.input}
					{...register('email', validators.email)}
					autoComplete='email'
				/>
				{errors.email && <ErrorInput errors={errors} field='email' />}
			</div>

			{/* password */}
			<div className='col-span-2'>
				<label htmlFor='password' className={styles.label}>
					Mot de passe
				</label>
				<input
					id='password'
					aria-invalid={errors.password ? 'true' : 'false'}
					type='password'
					placeholder='Saisissez votre mot de passe'
					className={styles.input}
					{...register('password', validators.password)}
					autoComplete='new-password'
				/>
				{errors.password && <ErrorInput errors={errors} field='password' />}
			</div>

			{/* Confirm passwors */}
			<div className='col-span-2 mb-5'>
				<label htmlFor='confirm-password' className={styles.label}>
					Confirmez le mot de passe
				</label>
				<input
					id='confirm-password'
					aria-invalid={errors.password ? 'true' : 'false'}
					type='password'
					placeholder='Confirmez le mot de passe'
					className={styles.input}
					{...register('confirmPassword', validators.confirmPassword)}
					autoComplete='new-password'
				/>
				{errors.confirmPassword && <ErrorInput errors={errors} field='confirmPassword' />}
			</div>
			<div className='col-span-2'>
				<Button type='submit' fullWidth disabled={!isEmpty(errors)} loading={loading}>
					S'inscrire
				</Button>
				{ApolloError && (
					<p className='rounded-sm bg-alert px-4 py-2 text-sm font-medium text-white'>
						{ApolloError.message}
					</p>
				)}
			</div>
		</form>
	)
}
