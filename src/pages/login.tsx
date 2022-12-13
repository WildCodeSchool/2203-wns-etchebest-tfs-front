import type { NextPage } from 'next'
import Head from 'next/head'
//Components
import { Auth } from '../components/auth/Auth'
import LoginForm from '../components/auth/LoginForm'

const LoginPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Connexion</title>
			</Head>
			<div className='flex items-center justify-center h-screen fit bg-secondary'>
					<Auth authType='login'  title='Welcome' subtitle='Login to your Structure account'>
						<LoginForm />
					</Auth>
			</div>
		</>
	)
}

export default LoginPage