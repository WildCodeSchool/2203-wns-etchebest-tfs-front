import React from 'react'
import { useRouter } from 'next/router'
//Librarie
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
//Component
import Button from '../Button'
import { ErrorInput } from '../common/form/ErrorInput'
//Styles
import styles from './LoginForm.module.css'
//Utiles
import { isEmpty } from '../../utils/objectIsEmpty'
//Queries
import { LOGIN_MUTATION } from '../../apollo/queries'

interface ILoginFormData {
	email: string
	password: string
}

export default function LoginForm() {
	//Form
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<ILoginFormData>({ mode: 'onTouched' })

	const validators: any = {
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
			}
		}
	}

	//Mutation
	const [mutateLogin, { data, loading, error: ApolloError }] = useMutation(LOGIN_MUTATION)

	const router = useRouter()

	const onSubmit = handleSubmit(payload => {
		mutateLogin({
			variables: {
				data: payload
			}
		})
			.then(data => {
				if (data) {
					localStorage.setItem('token', data.data.login)
					router.push('/')
				}
			})
			.catch(err => console.log(err))
	})

	return (
		<form className='min-w-100' onSubmit={onSubmit}>
			<div className='mb-3'>
				<label htmlFor='email' className={styles.label}>
					Email
				</label>
				<input
					id='email'
					value={data?.email}
					placeholder='Your email'
					className={styles.input}
					autoComplete='email'
					aria-invalid={errors.email ? 'true' : 'false'}
					{...register('email', validators.email)}
				/>
				<ErrorInput errors={errors} field='email' />
			</div>

			<div className='mb-8'>
				<label htmlFor='password' className={styles.label}>
					Mot de passe
				</label>
				<input
					id='password'
					value={data?.password}
					type='password'
					aria-invalid={errors.password ? 'true' : 'false'}
					className={styles.input}
					{...register('password', validators.password)}
					autoComplete='current-password'
					placeholder='Your password'
				/>
				<ErrorInput errors={errors} field='password' />
			</div>
			<Button type='submit' fullWidth loading={loading} disabled={!isEmpty(errors)}>
				Connexion
			</Button>
			{ApolloError && (
				<p className='rounded-sm bg-alert px-4 py-2 text-sm font-medium text-white'>
					{ApolloError.message}
				</p>
			)}
		</form>
	)
}
