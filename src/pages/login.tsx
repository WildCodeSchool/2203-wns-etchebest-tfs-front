import type { NextPage } from 'next'

import Head from 'next/head'
import Link from '../components/Link'
import Login from '../components/Login'

const LoginPage: NextPage = () => {
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
						<div className='mt-2 text-center text-sm text-gray-600'>
							Ou <Link href={'/register'}>S'inscrire'</Link>
						</div>
					</div>
					<Login />
				</div>
			</div>
		</>
	)
}

export default LoginPage