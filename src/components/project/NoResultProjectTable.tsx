import React, { Dispatch, SetStateAction } from 'react'
import { FolderOpenIcon, PlusSmIcon } from '@heroicons/react/outline'
import Button from '../common/Button'

interface NoResultProjectTableProps {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>

}

export function NoResultProjectTable({setIsOpenModal}:NoResultProjectTableProps) {
  return (
    <div className='flex flex-col pt-8 pb-14  items-center justify-center bg-white'>
        <FolderOpenIcon className="h-20 text-grey-300"/>
        <p className='font-medium text-primary text-xl mb-12'>Aucun projet disponible</p>
        <Button
            outlined
						onClick={() => setIsOpenModal(true)}
						icon={<PlusSmIcon className='h-5' />}
					>
						Ajouter un projet
					</Button>
    </div>
  )
}