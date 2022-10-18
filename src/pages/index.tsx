import type { NextPage } from 'next'
import Head from 'next/head'
// Components
import BaseLayout from '../layout/BaseLayout'
import Button from '../components/Button'
import Projects from '../components/project/Projects'
import ProjectHeader from '../components/project/projectHeader'
// Librairies
import { useQuery } from '@apollo/client'
// Queries
import { GET_PROJECTS } from 'src/apollo/queries'
import { Loader } from 'src/components/common/Loader'
import { useState } from 'react'
import { PlusIcon, PlusSmIcon } from '@heroicons/react/outline'

export interface IProject {
	id: number
	title: string
	subject: string
	updatedAt: string
	tickets: [
		{
			status:string
		}
	]
	members: [
		{
			firstname: string
		lastname: string
	}
	]
	user_author_project_id: number
}

const ProjectsPage: NextPage = () => {
	
  const { loading, error, data } = useQuery(GET_PROJECTS)
	const [searchValue, setSearchValue] = useState<string | null>(null)
	
	//Permet de renvoyer les projets en fonction de la recherche
	function filterProjects(projects:IProject[]) {
		if (searchValue) {
			return projects.filter(project => project.title.toLowerCase().includes(searchValue.toLowerCase()))
		}
		return projects
	}

	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchValue(e.currentTarget.value)
	}


	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Projets</title>
			</Head>
			<BaseLayout name={'Projets'} button={<Button icon={<PlusSmIcon className="h-5"/>}>Ajouter un projet</Button>}>
				<>
					<ProjectHeader handleSearch={handleSearch}/>
					{loading && <Loader className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 text-primary'/>}
					{!loading && <Projects projects={filterProjects(data.projects)} />}
				</>
			</BaseLayout>
		</div>
	)
}

export default ProjectsPage
