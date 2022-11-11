import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'
// Components
import BaseLayout from '../layout/BaseLayout'
import Button from '../components/Button'
import Projects from '../components/project/Projects'
import ProjectHeader from '../components/project/projectHeader'
import { Loader } from '../components/common/Loader'
// Librairies
import { useQuery } from '@apollo/client'
import { PlusSmIcon } from '@heroicons/react/outline'
// Queries
import { GET_PROJECTS } from '../apollo/queries'
// Types
import { Project, ProjectsData} from '../types'
import CreateProjectModal from '../components/project/CreateProjectModal'

const ProjectsPage: NextPage = () => {
	const { loading, error, data } = useQuery<ProjectsData>(GET_PROJECTS)
	const [searchValue, setSearchValue] = useState<string | null>(null)
	//Status de la modal de création de ticket
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

	//Permet de renvoyer les projets en fonction de la recherche
	function filterProjects(projects: Project[]) {
		if (searchValue) {
			return projects.filter(project =>
				project.title.toLowerCase().includes(searchValue.toLowerCase())
			)
		}
		return projects
	}

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.currentTarget.value)
	}

	return (
		<div className={'bg-gray-50 flex min-h-screen flex-col justify-between'}>
			<Head>
				<title>Projets</title>
			</Head>
			<BaseLayout
				name={'Projets'}
				button={
					<Button
						onClick={() => setIsOpenModal(true)}
						icon={<PlusSmIcon className='h-5' />}
					>
						Ajouter un projet
					</Button>
				}
			>
				<>
					<ProjectHeader handleSearch={handleSearch} />
					{loading && (
						<Loader className='absolute top-1/2 left-1/2 h-20 -translate-x-1/2 -translate-y-1/2 text-primary' />
					)}
					{!loading && data?.projects && (
						<Projects projects={filterProjects(data.projects)} />
					)}
					<CreateProjectModal setIsOpenModal={setIsOpenModal} isOpen={isOpenModal} />
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectsPage
