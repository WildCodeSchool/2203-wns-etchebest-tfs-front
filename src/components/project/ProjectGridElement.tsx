import { PhotographIcon } from '@heroicons/react/outline'

interface Properties {
  data: {
    subject: string,
    members: {}[]
  }
  
}

export default function ProjectGridElement({data}: Properties) {
  const {subject, members} = data
	return (
		<div className={'h-14 w-64 rounded relative flex bg-grey-100'}>
			<div className={'overflow-hidden rounded-l w-14 relative'}>
				<div className={'w-full h-full bg-primary flex items-center justify-center'}>
					<PhotographIcon className={'h-8 w-8 text-white'} />
				</div>

			</div>
			<div className={'px-3 py-2'}>
				<h3 className={'uppercase font-medium text-primary'}>{subject}</h3>
				<p className={'text-xs font-light text-primary'}>{members.length} Membres</p>
			</div>
		</div>
	)
}