import { SearchIcon } from '@heroicons/react/outline'
import Badge from '../Badge'

export default function TicketListFilters() {

	return (
		<div className={'relative w-full flex justify-between px-10 items-center gap-4 flex-wrap py-6'}>
			<div className={'min-w-max flex items-center gap-2'}>
				<input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="h-4 w-4 rounded border-grey-300 text-secondary focus:ring-secondary" />
				<p className={'text-grey-500'}>Seulement les miens</p>
			</div>
			<div className={'flex items-center md:max-w-md xl:max-w-2xl'}>
				<div className={'flex flex-wrap gap-2'}>
					<Badge onClose={() => {}}>Bug</Badge>
					<Badge onClose={() => {}}>Tâche</Badge>
					<Badge onClose={() => {}}>Review</Badge>
				</div>
				<p className={'whitespace-nowrap ml-2 text-grey-400 text-sm'}>+ Ajouter</p>
			</div>
			<div className="relative h-full rounded-md shadow-sm w-64">
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