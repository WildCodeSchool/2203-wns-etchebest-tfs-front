import Ticket, { ITicketsProps } from './Ticket'

export interface ITicketsListProps {
	tickets: ITicketsProps[]
}

const TicketList = ({ tickets }: ITicketsListProps) => (
	<div className='TicketsList'>
		{tickets.map(ticket => {
			return (
				<Ticket
					title={ticket.title}
					description={ticket.description}
					status={ticket.status}
					createdAt={ticket.createdAt}
					user={ticket.user}
				/>
			)
		})}
	</div>
)

export default TicketList
