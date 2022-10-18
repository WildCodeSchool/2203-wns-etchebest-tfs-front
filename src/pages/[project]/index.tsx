import type { NextPage } from 'next'
import Head from 'next/head'

import { useQuery } from '@apollo/client'
import { GET_TICKETS } from '../../apollo/queries'

import BaseLayout from '../../layout/BaseLayout'
import Button from '../../components/Button'
import TicketList from '../../components/ticketList/TicketList'
import ProjectItemOverview from '../../components/project/ProjectItemOverview'
import { PlusSmIcon } from '@heroicons/react/outline'

const ProjectPage: NextPage = () => {
	const { loading, error, data } = useQuery(GET_TICKETS)
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Projets</title>
			</Head>
			<BaseLayout name={'My app'} button={<Button icon={<PlusSmIcon className="h-5"/>}>Ajouter un Ticket</Button>}>
				<>
					<ProjectItemOverview opened={10} wip={15} review={105} done={100} cta={<Button outlined={true}>Last assigned ticket</Button>} />
					<h2 className={'text-secondary uppercase font-medium mb-2 mt-8'}>Tickets</h2>
					<TicketList tickets={data?.tickets ?? []} />
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectPage
