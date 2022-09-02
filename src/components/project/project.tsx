import { useQuery } from '@apollo/client'
import { GET_PROJECTS } from '../../apollo/queries'
import formatDate from '../../utils/formatDate/formatDate'

interface Project {
	createdAt: string
	id: number
	subject: String
}



export function Project() {
	const { loading, error, data } = useQuery(GET_PROJECTS)

	if (loading) return <p>'Loading...'</p>
	if (error) return <p>{`Error! ${error.message}`}</p>

	return (
		<section className='flex gap-10'>
			{data.projects.map((project: Project) => (
				<CardProject key={project.id} project={project} />
			))}
		</section>
	)
}

export function CardProject({ project }: { project: Project }) {
	return (
		<article className='cursor-pointer rounded bg-gray-200 p-6 transition-all hover:bg-gray-300'>
			<>
				<header>
					<h5 className='text-lg font-semibold'>{project.subject}</h5>
					<p className='text-xs text-gray-500'>
						{formatDate(project.createdAt)}
					</p>
				</header>
			</>
		</article>
	)
}
