import Link from 'next/link'
import formatDate from '../../utils/formatDate'

interface Properties {
  data: {
    subject: string,
    members: {}[],
    updatedAt: string,
    tickets: {
			opened: number,
			todo: number,
			ended: number
		}
  }
  
}

export default function ProjectListRow({data}: Properties) {
  const {subject, members, updatedAt, tickets} = data

	console.log(data)
	return (
		
		<Link href={'/1'}>
		<div className="grid grid-cols-6 text-primary text-sm font-semibold p-4 px-10 border-b border-grey-300 cursor-pointer hover:bg-grey-100 transition-all">
			<div>
				{subject}
			</div>
			<div>
				{10}
			</div>
			<div>
				{formatDate(updatedAt)}
			</div>
			<div className={'text-center'}>
				{10}
			</div>
			<div className={'text-center'}>
				{10}
			</div>
			<div className={'text-center'}>
				{10}
			</div>
		</div>
		</Link> 
	)
}