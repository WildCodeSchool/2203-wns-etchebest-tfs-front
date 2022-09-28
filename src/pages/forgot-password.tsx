import type { NextPage } from 'next'
import Head from 'next/head'
import Input from '../components/common/form/Input'

const LoginPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<div className={'relative h-screen w-screen bg-gray-50 pt-32'}>
				<div
					className={'relative mx-auto max-w-3xl rounded bg-white p-10 shadow'}
				>
					<div className='mx-auto mb-12 w-full max-w-md'>
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
							Mot de passe oublié
						</h2>
					</div>
					<form className='space-y-6' action='#' method='POST'>
						<Input
							id={'email'}
							type={'email'}
							name={'email'}
							label={'Adresse Mail'}
						/>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
							>
								Envoyer une demande de réinitialisation
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
