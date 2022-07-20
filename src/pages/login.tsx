import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'

import Head from 'next/head'
import Link from '../components/Link'
import Input from '../components/form/Input'

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
	const onSubmit = handleSubmit(data => console.log(data))

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
				<label>Password</label>
				<input
					{...register('password', {
						required: true,
						minLength: 4
					})}
				/>
				<input type='submit' />
			</form>
		</>
	)
}

export default LoginPage
