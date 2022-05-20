import Link from 'next/link'

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
	user,
	createdAt
}: ITicketsProps) => {
	return (
		<tr className={'group h-20'}>
			<td className={''}>{title}</td>
			<td className={''}>{description}</td>
			<td className={''}>{status}</td>
			<td className={''}>{user}</td>
			<td className={''}>{createdAt}</td>
		</tr>
		// <div>
		// 	<h2>Titre : {title}</h2>
		// 	<p>Déscription : {description}</p>
		// 	<span>Status : {status}</span>
		// 	<span>
		// 		Créé par {user} le {createdAt}
		// 	</span>
		// 	<Link href={`/task/${id}`}>
		// 		<button>Voir le ticket</button>
		// 	</Link>

		// 	{/* Les commentaires
		//      <div>
		// 	<ul>
		// 		{comments.map(comment => {
		// 			return <Comment />
		// 		})}
		// 	</ul>
		// </div> */}
		// </div>
	)
}
export default Ticket
