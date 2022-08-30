import type { NextPage } from 'next'

import Head from 'next/head'
import Link from '../components/Link'
import Register from '../components/Register'

const RegisterPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Inscription</title>
			</Head>
			<div className={'relative h-screen w-screen bg-gray-50 pt-32'}>
				<div
					className={'relative mx-auto max-w-3xl rounded bg-white p-10 shadow'}
				>
					<div className='mx-auto mb-12 w-full max-w-md'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							S'inscrire
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Ou <Link href={'/login'}>Se connecter</Link>
						</p>
					</div>
					<Register />
				</div>
			</div>
		</>
	)
}

export default RegisterPage