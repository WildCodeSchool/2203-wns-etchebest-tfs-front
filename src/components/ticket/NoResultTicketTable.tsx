import React, { Dispatch, SetStateAction } from 'react'
import { PlusSmIcon, TicketIcon } from '@heroicons/react/outline'
import Button from '../common/Button'

interface NoResultTicketTableProps {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  projectName: string | undefined
}

export function NoResultTicketTable({setIsOpenModal, projectName}:NoResultTicketTableProps) {
  return (
    <div className='flex flex-col pt-8 pb-14  items-center justify-center bg-white'>
        <TicketIcon className="h-20 text-grey-300"/>
        <p className='font-medium text-primary text-xl mb-12'>Le projet { projectName } ne comporte aucun ticket</p>
        <Button
            outlined
						onClick={() => setIsOpenModal(true)}
						icon={<PlusSmIcon className='h-5' />}
					>
						Ajouter un Ticket
					</Button>
    </div>
  )
}

