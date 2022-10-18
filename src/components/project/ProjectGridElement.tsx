import { PhotographIcon } from '@heroicons/react/outline'

interface Properties {
  data: {
    subject: string,
    members: {}[]
		title: string
  }
  
}

export default function ProjectGridElement({data}: Properties) {
  const {title, members} = data
	return (
		<div className='h-14 w-64 rounded relative flex bg-grey-100'>
			<div className='overflow-hidden rounded-l w-14 relative'>
				<div className='w-full h-full bg-primary flex items-center justify-center'>
					<PhotographIcon className='h-8 w-8 text-white' />
				</div>

			</div>
			<div className='px-4 py-3'>
				<h3 className='uppercase font-medium text-primary whitespace-nowrap'>{title}</h3>
				<p className='text-xs font-light text-primary'>{members.length} Membres</p>
			</div>
		</div>
	)
}