import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
//Librairies
import { TrashIcon } from '@heroicons/react/outline'
import { ApolloError, gql, useLazyQuery, useMutation } from '@apollo/client'
//Queries / Mutations
import { GET_TICKET } from '../../apollo/queries'
import { DELETE_TICKET } from '../../apollo/mutations'
//Types
import { TicketData } from '../../types'
import { useGuardByRoles } from '../../hooks/useGuardByRoles'
import { GUARD_ROUTES } from '../../GuardConfig'
//Components
import BaseLayout from '../../layout/BaseLayout'
import TicketLeftPanel from '../../components/ticket/TicketLeftPanel'
import TicketRightPanel from '../../components/ticket/TicketRightPanel'
import Button from '../../components/common/Button'

const ProjectTicketPage: NextPage = () => {
	const { authedUser, isAllow } = useGuardByRoles(GUARD_ROUTES.ticket.page, '/login')

	const router = useRouter()
	console.log(router)
	const ticketID = router.query.slug

	//------ API CALL --------------------------
	const [getTicket, { data, loading, error }] = useLazyQuery<TicketData>(GET_TICKET)
	const [deleteTicket, { loading: deleteTicketLoading }] = useMutation(DELETE_TICKET, {
		onCompleted: () => router.push(`/${router.query.project}`)
	})

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

	function handleDeleteTicket() {
		console.log('delete')
		deleteTicket({ variables: { where: { id: Number(ticketID) } } })
	}

	function btnDelete() {
		if (!authedUser || !GUARD_ROUTES.ticket.actions.delete.includes(authedUser?.role))
			return
		return (
			<Button
				outlined
				alert
				loading={deleteTicketLoading}
				onClick={() => handleDeleteTicket()}
				icon={<TrashIcon className={'h-4 w-4'} />}
			>
				Suprimmer le ticket
			</Button>
		)
	}

	return (
		<div className={'bg-gray-50 flex min-h-screen flex-col justify-between'}>
			<Head>
				<title>Structure | {data?.ticket.title}</title>
			</Head>
			{!loading && !error && data && (
				<BaseLayout
					name={`Project/${data.ticket.project.title}/${data.ticket.title}`}
					button={btnDelete()}
				>
					<div
						className={
							'mt-5 flex h-[80vh] w-full rounded border border-grey-300 bg-white p-8'
						}
					>
						<TicketLeftPanel ticket={data.ticket} />
						<TicketRightPanel ticket={data.ticket} />
					</div>
					{!loading && error && <div>{(error as ApolloError).message}</div>}
				</BaseLayout>
			)}
		</div>
	)
}

export default ProjectTicketPage
