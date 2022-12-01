import React, { PropsWithChildren } from 'react'
import { FolderOpenIcon } from '@heroicons/react/outline'


interface NoResultTicketTableProps extends PropsWithChildren{
  
}

export function NoResultTicketTable({children}: NoResultTicketTableProps) {
  return (
    <div className='flex flex-col pt-3 pb-12  items-center justify-center bg-white'>
        <FolderOpenIcon className="h-40 stroke-1 text-grey-300"/>
        <p className='font-bold text-secondary text-xl'></p>
        {children}
    </div>
  )
}