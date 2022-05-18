export interface ITicketsProps {
	title: String
	description: String
	status: String
	//Relation aves l'utilisateur
	user: String
	comments: string
}

const Ticket = ({ title, description, status, user }: ITicketsProps) => (
	<div>
		<h2>{title}</h2>
		<p>{description}</p>
		<span>{status}</span>
		<span> {user}</span>

		{/* Les commentaires
         <div>
			<ul>
				{comments.map(comment => {
					return <Comment />
				})}
			</ul>
		</div> */}
	</div>
)

export default Ticket
