import type { NextPage } from 'next'
import Button from '../../components/Button'
import BaseLayout from '../../layout/BaseLayout'

const ListTaskPage: NextPage = () => {
	const Row = () => (
		<tr className={'group h-20'}>
			<td className={''}>Csss</td>
			<td>PRojet osef</td>
			<td>En cours</td>
			<td>Teddy</td>
			<td>21/05/2022</td>
			<td className={''}>
				<Button>Voir le ticket</Button>
			</td>
		</tr>
	)

	return (
		<BaseLayout name='test'>
			<table className='w-full'>
				<thead className={'bg-gray-100'}>
					<tr>
						<td>Nom</td>
						<td>Projet</td>
						<td>Status</td>
						<td>Assigné</td>
						<td>Date</td>
						<td></td>
					</tr>
				</thead>
				<tbody className={''}>
					<Row />
					<Row />
					<Row />
					<Row />
					<Row />
				</tbody>
				{/* {tickets.map(ticket => (
				<Ticket
					key={ticket.id}
					id={ticket.id}
					title={ticket.title}
					description={ticket.description}
					status={ticket.status}
					createdAt={ticket.createdAt}
					user={ticket.user}
				/>
			))} */}
			</table>
		</BaseLayout>
	)
}
export default ListTaskPage
