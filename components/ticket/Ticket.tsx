import Link from 'next/link'
import Button from '../Button'
import formatDate from '../../utils/formatDate/formatDate'

export interface ITicketsProps {
	id: number
	title: string
	description: string
	status: string
	createdAt: string
	//Relation aves l'utilisateur
	user?: string
	//comments: string
}

const Ticket = ({
	id,
	title,
	description,
	status,
	user,
	createdAt
}: ITicketsProps) => {
	return (
		<tr className={'group h-20'}>
			<td className={''}>{title}</td>
			<td className={''}>{description}</td>
			<td className={''}>{status}</td>
			<td className={''}>{user}</td>
			<td className={''}>{formatDate(createdAt)}</td>
			<td>
				<Button>
					<Link href={`/task/${id}`}>Voir le ticket</Link>
				</Button>
			</td>
		</tr>
	)
}
export default Ticket
