import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../../layout/BaseLayout'

const UserPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Utilisateurs</title>
			</Head>
			<BaseLayout name={'Utilisateurs'}></BaseLayout>
		</div>
	)
}

export default UserPage
