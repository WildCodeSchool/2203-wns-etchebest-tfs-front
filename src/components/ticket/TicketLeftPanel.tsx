import { useQuery } from '@apollo/client'
import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/outline'
import { GET_TICKET_COMMENTS } from '../../apollo/queries'

import Button from '../../components/Button'
import { CommentsData, Ticket, User } from '../../types'
import formatDate from '../../utils/formatDate'
import { Loader } from '../common/Loader'


interface TicketLeftPanelProps {
	ticket: Ticket
}

export default function TicketLeftPanel({ ticket }:TicketLeftPanelProps) {

	const classes = {
		titles: 'text-grey-500 font-medium uppercase',
		subTitles: 'text-grey-500'
	}

	const variables = {
		variables:
		{
			where:
			{
				ticket_id:
				{
					equals: ticket.id
				}
			}
		}
	}
	const {data, loading, error} = useQuery<CommentsData>(GET_TICKET_COMMENTS, variables)


	return (
		<div className={'w-7/12 border-r border-grey-300 h-full overflow-auto pr-12 flex flex-col justify-between'}>
			<h2 className={'text-primary font-medium text-2xl'}>{ticket.title}</h2>
			<div className={'mt-8'}>
				<h3 className={classes.titles}>Sujet</h3>
				<p className={'text-primary'}>{ticket.description}</p>
			</div>
			{/* --------- Pièces Jointes --------- */}
			<div className={'mt-8'}>
				<h3 className={classes.titles}>Pièces Jointes</h3>
				<div className={'rounded flex flex-col items-center justify-center p-8 outline-dashed outline-2 outline-grey-500 mx-1 mt-4'}>
					<PhotographIcon className={'text-grey-200 h-16 w-16 mb-5'} />
					<Button outlined={true}><DocumentAddIcon className={'w-4 h-4'} /> Ajouter un fichier </Button>
				</div>
			</div>
			{/* --------- fin Pièces Jointes --------- */}
			{/* --------- Commentaires --------- */}
			<div className={'mt-8 space-y-4'}>
				<h3 className={classes.titles}>Commentaires</h3>
				{loading && 
				<div className="flex justify-center">
					<Loader className='text-primary h-16'/>
				</div> }
				{data?.comments.length === 0 && 
				<div className="flex justify-center">
					<p className='text-grey-500 text-sm'>Aucun commentaire</p>
				</div> }
				{(!loading && !error && data) &&
				<div className={'overflow-auto max-h-32 space-y-2'}>
					{ data.comments.map((comment) => {
						return (<TicketComment author={comment.author} content={comment.content} createAt={comment.createdAt}/>)
					})}		
				</div>
				}
				<input
          type="add-comment"
          name="add-comment"
          id="add-comment"
          className='block w-full h-9 p-2  rounded-sm border text-sm text-primary border-grey-500 placeholder-grey-400 placeholder:text-sm focus:border-secondary focus:text-secondary   focus:ring-grey-500'
          placeholder="Ajouter un commentaire"
        />
			</div>
			{/* ---------Fin Commentaires --------- */}
		</div>
	)
}


type TicketCommentProps = {	
	author: Pick<User, "firstname" | "lastname">
	content: string
	createAt: Date
}

const TicketComment = ({author,content,createAt}:TicketCommentProps) => {
	return (
		<div>
			<h6 className={'text-xs text-grey-500'}>
				<span className='mr-1'>{author.firstname}{author.lastname}</span>
				-
				<span className='ml-1'>{formatDate(createAt)}</span>
			</h6>
			<p className={'text-primary text-sm'}>{content}</p>
		</div>
	)
}