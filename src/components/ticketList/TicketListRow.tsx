import Badge from '../Badge'
import Link from 'next/link'
import formatDate from '../../utils/formatDate'

export default function TicketListRow({data}: any) {
	const {priority, title, label, status, createdAt, user} = data

	return (
		// Todo
		<Link href={'/'}>
		<div className={'relative grid grid-cols-12 border-b border-grey-200 py-4 px-10 gap-4 cursor-pointer hover:bg-grey-100 transition-all'}>
			<div className={''}>
				{priority ? ('🚀'.repeat(priority)) : '🚀' }
			</div>
			<div className={'col-span-5'}>
				{title}
				</div>
			<div className={'text-center'}>
				<Badge>{label ?? '' }</Badge>
				</div>
			<div className={'col-span-2'}>
				{status}
				</div>
			<div className={'col-span-2'}>
				{formatDate(createdAt)}
				</div>
			<div className={''}>
				<div className={'w-5 h-5 rounded-full bg-primary'} />
			</div>
		</div>
		</Link>
	)
}
