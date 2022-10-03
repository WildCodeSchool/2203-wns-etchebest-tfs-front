import type { NextPage } from 'next'
import Head from 'next/head'

import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../../apollo/queries'

import BaseLayout from '../layout/BaseLayout'
import Button from '../components/Button'
import Projects from '../components/project/Projects'
import ProjectHeader from '../components/project/projectHeader'

const ProjectsPage: NextPage = () => {

		// const { loading, error, data } = useQuery(GET_PROJECTS)
		// if (loading) return <p>'Loading...'</p>
		// if (error) return <p>{`Error! ${error.message}`}</p>
	
	const projectElementData = {
		subject: 'Nom du projets',
		members: [
			{name: 1},
			{name: 2}
		],
		lastUpdate: '18 sept. 2022',
		tickets: {
			opened: 3,
			todo: 12,
			ended: 18
		}
	}

	const projects = [
		projectElementData, projectElementData, projectElementData
	]

	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Projets</title>
			</Head>
			<BaseLayout name={'Projets'} button={<Button>+ Ajouter un projet</Button>}>
				<>
					<ProjectHeader />
					<Projects projects={projects} />
				</>
				
			</BaseLayout>
		</div>
	)
}

export default ProjectsPage
