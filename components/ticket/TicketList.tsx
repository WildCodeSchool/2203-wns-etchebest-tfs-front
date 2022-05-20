import Ticket, { ITicketsProps } from './Ticket'

export interface ITicketsListProps {
	tickets: ITicketsProps[]
}

const TicketList = ({ tickets }: ITicketsListProps) => (
	<table className='TicketsList'>
		<thead>
			<tr>
				<td>Nom</td>
				<td>Projet</td>
				<td>Status</td>
				<td>Assigné</td>
				<td>Date</td>
				<td></td>
			</tr>
		</thead>
		{tickets.map(ticket => (
			<Ticket
				key={ticket.id}
				id={ticket.id}
				title={ticket.title}
				description={ticket.description}
				status={ticket.status}
				createdAt={ticket.createdAt}
				user={ticket.user}
			/>
		))}
	</table>
)

export default TicketList
