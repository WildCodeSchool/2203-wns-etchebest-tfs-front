import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'

import Head from 'next/head'
import Link from '../components/Link'

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
						<Link href={'/register'}>
							<p className='mt-2 text-center text-sm text-gray-600'>
								Ou S'inscrire
							</p>
						</Link>
					</div>
					<form className='space-y-6' onSubmit={onSubmit}>
						<label
							htmlFor='email'
							className=' text-sm font-medium text-gray-700'
						>
							Email
						</label>
						<div>
							<input
								className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
								{...register('email', {
									required: true,
									pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
								})}
							/>
						</div>
						{errors.email && (
							<span className='text-red-500'>Adresse email non valide</span>
						)}
						<label htmlFor='password'>Mot de passe</label>
						<div>
							<input
								type='password'
								className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
								{...register('password', { required: true })}
							/>
						</div>
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
