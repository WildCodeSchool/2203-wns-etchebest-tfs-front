export interface ITicketsProps {
	id: number
	title: String
	description: String
	status: String
	createdAt?: Date
	//Relation aves l'utilisateur
	user?: String
	//comments: string
}

const Ticket = ({
	id,
	title,
	description,
	status,
	createdAt,
	user
}: ITicketsProps) => {
	return (
		<div>
			<h2>Titre : {title}</h2>
			<p>Déscription : {description}</p>
			<span>Status : {status}</span>
			<span>
				Créé par {user} le {createdAt}
			</span>

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
}
export default Ticket
