import React, { Dispatch, SetStateAction, useContext } from 'react'
import { PlusSmIcon, TicketIcon } from '@heroicons/react/outline'
import Button from '../common/Button'
import { GUARD_ROUTES } from '../../GuardConfig'
import { AuthContext } from '../../UserContext'

interface NoResultTicketTableProps {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
	projectName: string | undefined
}

export function NoResultTicketTable({
	setIsOpenModal,
	projectName
}: NoResultTicketTableProps) {
	const authCtx = useContext(AuthContext)

	function renderBtnByRole() {
		if (
			authCtx &&
			authCtx.authUser &&
			GUARD_ROUTES.ticket.actions.create.includes(authCtx.authUser.role)
		) {
			return (
				<Button
					outlined
					onClick={() => setIsOpenModal(true)}
					icon={<PlusSmIcon className='h-5' />}
				>
					Ajouter un Ticket
				</Button>
			)
		}
		return null
	}

	return (
		<div className='flex flex-col items-center justify-center  bg-white pt-8 pb-14'>
			<TicketIcon className='h-20 text-grey-300' />
			<p className='mb-12 text-xl font-medium text-primary'>
				Le projet {projectName} ne comporte aucun ticket
			</p>
			{renderBtnByRole()}
		</div>
	)
}
