import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../layout/BaseLayout'

const RegisterPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Register</title>
			</Head>
		</div>
	)
}

export default RegisterPage
