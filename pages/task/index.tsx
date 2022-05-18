import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../../layout/BaseLayout'

const ListTaskPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Liste des Taches</title>
			</Head>
			<BaseLayout name={'Taches'}></BaseLayout>
		</div>
	)
}

export default ListTaskPage
