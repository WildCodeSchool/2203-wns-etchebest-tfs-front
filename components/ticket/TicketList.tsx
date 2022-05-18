import Ticket from './TicketComponent'

const ticketList = ({ ticket }) => {
	return (
		<div className='Tickets'>
			{tickets.map(ticket => {
				return (
					<article className='ticketList'>
						<p>{ticket.title}</p>
						<p>{ticket.description}</p>
						<p>{ticket.status}</p>
						<p>{ticket.user}</p>
					</article>
				)
			})}
		</div>
	)
}

export default ticketList
