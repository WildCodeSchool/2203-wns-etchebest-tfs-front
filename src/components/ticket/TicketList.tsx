// import CreateTicket from './Create'
import Ticket, { ITicketsProps } from './Ticket'

export interface ITicketsListProps {
	tickets: ITicketsProps[]
}

const TicketList = ({ tickets }: ITicketsListProps) => (
	<>
		{/* <CreateTicket /> */}
		<table className='TicketsList w-full '>
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
			<tbody>
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
			</tbody>
		</table>
	</>
)

export default TicketList
