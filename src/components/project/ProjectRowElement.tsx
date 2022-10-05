import Link from 'next/link'

interface Properties {
  data: {
    subject: string,
    members: {}[],
    lastUpdate: string,
    tickets: {
			opened: number,
			todo: number,
			ended: number
		}
  }
  
}

export default function ProjectListRow({data}: Properties) {
  const {subject, members, lastUpdate, tickets} = data
	return (
		<Link href={'/1'}>
		<div className="grid grid-cols-6 text-primary text-sm font-semibold p-4 px-10 border-b border-grey-300 cursor-pointer hover:bg-grey-100 transition-all">
			<div>
				{subject}
			</div>
			<div>
				{members.length}
			</div>
			<div>
				{lastUpdate}
			</div>
			<div className={'text-center'}>
				{tickets.opened}
			</div>
			<div className={'text-center'}>
				{tickets.todo}
			</div>
			<div className={'text-center'}>
				{tickets.ended}
			</div>
		</div>
		</Link>
	)
}