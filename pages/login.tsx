import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../layout/BaseLayout'

const LoginPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Login</title>
			</Head>
		</div>
	)
}

export default LoginPage
