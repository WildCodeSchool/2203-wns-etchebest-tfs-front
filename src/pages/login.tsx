import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'

import Head from 'next/head'
import Link from '../components/Link'
import Input from '../components/form/Input'
import Button from '../components/Button'
import { useRouter } from 'next/router'

interface IFormData {
	email: String
	password: String
}

const LoginPage: NextPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IFormData>()
	const router = useRouter()
	const onSubmit = handleSubmit(data => {
		console.log(data)
		router.push('/')
	})

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<form onSubmit={onSubmit}>
				<label>Email</label>
				<input
					{...register('email', {
						required: true,
						pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
					})}
				/>
				{errors.email && <span>Adresse email invalide</span>}
				<label>Password</label>
				<input
					{...register('password', {
						required: true
					})}
				/>
				{errors.password && <span>Mot de passe incorrect</span>}
				<Button type='submit'>Envoyer</Button>
			</form>
		</>
	)
}

export default LoginPage
