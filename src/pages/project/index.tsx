import type { NextPage } from 'next'
import Head from 'next/head'
import Button from '../../components/Button'
import BaseLayout from '../../layout/BaseLayout'

import {Project} from '../../components/project/project'

const ProjectPage: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Projets</title>
			</Head>
			<BaseLayout name={'Projets'} button={<Button>Test</Button>}>
				<Project></Project>
			</BaseLayout>
		</div>
	)
}

export default ProjectPage
