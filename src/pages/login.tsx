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
				<title>Connexion</title>
			</Head>
			<div className={'relative h-screen w-screen bg-gray-50 pt-32'}>
				<div
					className={'relative mx-auto max-w-3xl rounded bg-white p-10 shadow'}
				>
					<div className='mx-auto mb-12 w-full max-w-md'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Se connecter
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Ou <Link href={'/register'}>S'inscrire</Link>
						</p>
					</div>
					<form className='space-y-6' onSubmit={onSubmit}>
						<Input
							id={'email'}
							type={'email'}
							label={'Adresse Mail'}
							{...register('email', {
								required: true,
								pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
							})}
						/>
						{errors.email && (
							<span className='text-red-500'>Adresse email invalide</span>
						)}

						<Input
							id={'password'}
							type={'password'}
							label={'Mot de passe'}
							{...register('password', {
								required: true
							})}
						/>
						{errors.password && (
							<span className='text-red-500'>Mot de passe incorrect</span>
						)}

						<div>
							<Button type='submit'>Connexion</Button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
