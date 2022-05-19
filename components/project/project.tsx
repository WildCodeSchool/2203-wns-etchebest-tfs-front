
import { gql, useQuery } from '@apollo/client'
import formatDate from '../../utils/formatDate'

interface Project{
    createdAt: string
    id: number
    subject: String
} 

export const GET_PROJECTS = gql`
query Projects {
    projects {
      createdAt
      id
      subject
    }
  }
`

export function Project(){
	const { loading, error, data } = useQuery(GET_PROJECTS)

	if (loading) return <p>'Loading...'</p>
	if (error) return <p>{`Error! ${error.message}`}</p>

	return (
		<section className='flex gap-10'>
            {data.projects.map((project:Project) =><CardProject key={project.id} project={project}/>)}
		</section>
	)
}

export function CardProject({project}:{project:Project}){
	const { loading, error, data } = useQuery(GET_PROJECTS)

	if (loading) return <p>'Loading...'</p>
	if (error) return <p>{`Error! ${error.message}`}</p>

	return (
		<article className='bg-gray-200 hover:bg-gray-300 p-6 rounded cursor-pointer transition-all'>
            <>
            <header>
            <h5 className='text-lg font-semibold'>{project.subject}</h5>
            <p className="text-xs text-gray-500">{formatDate(project.createdAt)}</p>
            </header>
            
            </>
		</article>
	)
}
