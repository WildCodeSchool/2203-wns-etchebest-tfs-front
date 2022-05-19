import type { NextPage } from 'next'
import Head from 'next/head'
import Link from '../components/Link'
import Input from '../components/form/Input'

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
							Se connecter
						</h2>
						<p className='mt-2 text-center text-sm text-gray-600'>
							Ou <Link href={'/register'}>S'inscrire</Link>
						</p>
					</div>
					<form className='space-y-6' action='#' method='POST'>
						<Input
							id={'email'}
							type={'email'}
							name={'email'}
							label={'Adresse Mail'}
						/>

						<Input
							id={'password'}
							type={'password'}
							name={'password'}
							label={'Mot de passe'}
						/>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember'
									name='remember'
									type='checkbox'
									className='h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500'
								/>
								<label
									htmlFor='remember'
									className='ml-2 block text-sm text-gray-900'
								>
									Se souvenir de moi
								</label>
							</div>

							<div className='text-sm'>
								<Link href='/forgot-password'>Mot de passe oublié</Link>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
							>
								Se connecter
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginPage
