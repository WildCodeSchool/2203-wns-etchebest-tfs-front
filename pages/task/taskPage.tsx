import type { NextPage } from 'next'
import Head from 'next/head'
import BaseLayout from '../../layout/BaseLayout'
import Ticket from '../../components/ticket/Ticket'

const TaskPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Tache</title>
			</Head>
			<BaseLayout name={'Tache'}>
				<Ticket title={title} />
			</BaseLayout>
		</div>
	)
}

export default TaskPage
