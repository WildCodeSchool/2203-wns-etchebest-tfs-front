import type { NextPage } from 'next'
import Head from 'next/head'
import { TrashIcon } from '@heroicons/react/outline'

import Button from '../../components/Button'
import BaseLayout from '../../layout/BaseLayout'
import TicketLeftPanel from '../../components/ticket/TicketLeftPanel'
import TicketRightPanel from '../../components/ticket/TicketRightPanel'

const ProjectTicketPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Titre du ticket</title>
			</Head>
			<BaseLayout name={'My app'} button={<Button outlined={true} className={'border-alert_dark text-alert_dark'}><TrashIcon className={'h-4 w-4'} />Suprimmer le ticket</Button>}>
				<div className={'bg-white border border-grey-300 rounded w-full p-8 mt-5 flex h-[80vh]'}>
					<TicketLeftPanel />
					<TicketRightPanel />
				</div>
			</BaseLayout>
		</div>
	)
}

export default ProjectTicketPage
