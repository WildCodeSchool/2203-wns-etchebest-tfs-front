import React, { Dispatch, SetStateAction, useContext } from 'react'
import { FolderOpenIcon, PlusSmIcon } from '@heroicons/react/outline'
import Button from '../common/Button'
import { AuthContext } from '../../UserContext'
import { GUARD_ROUTES } from '../../GuardConfig'

interface NoResultProjectTableProps {
	setIsOpenModal: Dispatch<SetStateAction<boolean>>
}

export function NoResultProjectTable({ setIsOpenModal }: NoResultProjectTableProps) {
	const authCtx = useContext(AuthContext)

	function renderBtnByRole() {
		if (
			authCtx &&
			authCtx.authUser &&
			GUARD_ROUTES.project.actions.create.includes(authCtx.authUser.role)
		) {
			return (
				<Button
					outlined
					onClick={() => setIsOpenModal(true)}
					icon={<PlusSmIcon className='h-5' />}
				>
					Ajouter un projet
				</Button>
			)
		}
		return null
	}

	return (
		<div className='flex flex-col items-center justify-center  bg-white pt-8 pb-14'>
			<FolderOpenIcon className='h-20 text-grey-300' />
			<p className='mb-12 text-xl font-medium text-primary'>Aucun projet disponible</p>
			{renderBtnByRole()}
		</div>
	)
}
