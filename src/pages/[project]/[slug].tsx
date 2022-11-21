import type { NextPage } from 'next'
import Head from 'next/head'
import { TrashIcon } from '@heroicons/react/outline'

import Button from '../../components/Button'
import BaseLayout from '../../layout/BaseLayout'
import TicketLeftPanel from '../../components/ticket/TicketLeftPanel'
import TicketRightPanel from '../../components/ticket/TicketRightPanel'
import { ApolloError, gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_TICKET } from '../../apollo/queries'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TicketData } from '../../types'



const ProjectTicketPage: NextPage = () => {

	const router = useRouter()
	const ticketID = router.query.slug
	

	 const [getTicket,{data , loading, error }] = useLazyQuery<TicketData>(GET_TICKET)
	 const DELETE_TICKET = gql`
		mutation DeleteTicket($where: TicketWhereUniqueInput!) {
			deleteTicket(where: $where) {
				id
				title
			}
		}
		`
	 const [deleteTicket,{loading : deleteTicketLoading}]= useMutation(DELETE_TICKET, {onCompleted: () => router.push(`/${router.query.project}`)})

	useEffect(() => {
    if (router.query.slug) {
			getTicket({
				variables: {
				where: {
					id: Number(ticketID)
					}
				}
			})
    }
	}, [router.query.slug])

	function handleDeleteTicket(){
		console.log("delete")
		deleteTicket({variables: {where: {id: Number(ticketID)}}})
	}

	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Structure | {data?.ticket.title}</title>
			</Head>
			{(!loading && !error && data) &&<BaseLayout name={`Project/${data.ticket.project.title}/${data.ticket.title}`} button={
			<Button outlined onClick={()=>handleDeleteTicket()} icon={<TrashIcon className={'h-4 w-4'} />} className={'border-alert_dark text-alert_dark'}>
				Suprimmer le ticket
				</Button>}>
				 <div className={'bg-white border border-grey-300 rounded w-full p-8 mt-5 flex h-[80vh]'}>
					<TicketLeftPanel ticket={data.ticket} />
					<TicketRightPanel ticket={data.ticket} />
				</div>
				{(!loading && error) && <div>{(error as ApolloError).message}</div>}
			</BaseLayout>}
		</div>
	)
}

export default ProjectTicketPage
