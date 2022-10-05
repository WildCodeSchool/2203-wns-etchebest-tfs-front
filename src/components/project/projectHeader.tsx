import { MenuIcon, SearchIcon, ViewGridIcon } from '@heroicons/react/outline'
import { useContext } from 'react'

import StoreContext from '../../context/StoreContext'
import classNames from '../../utils/classNames'

const FilterIcon = ({children, onClick, active = false}: any) => (
	<div 
		className={classNames(
			'py-3 px-6 rounded cursor-pointer',
			active ? 'bg-primary text-white' : ' text-primary bg-white border border-grey-300'
		)}
		onClick={onClick}
	>
		{children}
	</div>
)

export default function ProjectHeader() {

	const {projectView} = useContext(StoreContext)

	console.log(projectView)

  return (
    <div className={'flex justify-between w-full items-center mt-5'}>
			<div className={'flex gap-2'}>
				<FilterIcon active={projectView.data === 'row'} onClick={() => projectView.change('row')}>
					<MenuIcon className={'w-6 h-6'} />
				</FilterIcon>
				<FilterIcon active={projectView.data === 'grid'} onClick={() => projectView.change('grid')}>
					<ViewGridIcon className={'w-6 h-6'} />
				</FilterIcon>
			</div>
			<div className="relative h-full rounded-md shadow-sm">
        <div className="pointer-events-none h-full absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-grey-500" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className='block w-full h-full pl-10 py-2  rounded-sm border text-sm text-primary border-grey-500 placeholder-grey-400 placeholder:text-sm focus:border-secondary focus:text-secondary   focus:ring-grey-500'
          placeholder="Rechercher"
        />
      </div>
		</div>
  )
}