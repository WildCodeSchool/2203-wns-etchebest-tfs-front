import type { NextPage } from 'next'
import Head from 'next/head'
import { Auth } from '../components/auth/Auth'
import { RegisterForm } from '../components/auth/RegisterForm'

const RegisterPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Inscription</title>
			</Head>
			<div className='flex items-center justify-center h-screen fit bg-secondary'>
					<Auth authType='register' title='Nouveau compte' subtitle="Pour accéder à l'application">
						<RegisterForm />
					</Auth>
			</div>
		</>
	)
}
export default RegisterPage;


