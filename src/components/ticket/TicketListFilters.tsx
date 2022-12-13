import { useState } from 'react'
//Components
import Badge from '../common/badge/Badge'
//Libraries
import { PlusSmIcon, SearchIcon } from '@heroicons/react/outline'
//Types
import { Status } from '../../types'


interface Filters {
	own: boolean
	status: Status[]
	search: string
}

export default function TicketListFilters() {

	const [filterModalIsOpen, setfilterModalIsOpen] = useState(false)
	const [filters, setFilters] = useState<Filters>({
		own: false,
		status: [],
		search: "",
	})

	//
	function handleBadgeRemove(statusRemove:Status) {
		if(!filters.status.includes(statusRemove)) return
		setFilters(({...filters, status: filters.status.filter(s => s !== statusRemove)}))
	}

	// Filtre "Mes tickets"
	function handleOwnFilterChange() {
		setFilters({...filters, own: !filters.own})
	}

	// Filtre "Recherhe"
	function handleSearchFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFilters({...filters, search: e.currentTarget.value})
	}
	
	return (
		<div className='relative w-full flex justify-between px-10 items-center gap-4 flex-wrap py-6'>
			 {/* <pre className=''>{JSON.stringify(filters,null,2)}</pre>  */}
			<div className='flex gap-8'>
				<div className='min-w-max flex items-center gap-2'>
					<input onChange={()=> handleOwnFilterChange() } checked={filters.own} id="my-tickets" name="comments" type="checkbox" className="h-4 w-4 rounded-sm border-grey-300 text-secondary focus:ring-secondary" />
					<label className='text-grey-500' htmlFor='my-tickets'>Mes tickets</label>
				</div>
				<div className='flex items-center md:max-w-md xl:max-w-2xl'>
					<div className='flex flex-wrap gap-2'>
						 {filters.status.map((status, i)=> <Badge key={i} onClose={() => {handleBadgeRemove(status)}}>{status}</Badge>)}
							<ModalFilterChoose isOpen={filterModalIsOpen} filters={filters} setFilters={setFilters}/>
					</div>
					<button className='whitespace-nowrap ml-2 text-grey-500 text-md hover:text-primary' onClick={()=>{setfilterModalIsOpen(!filterModalIsOpen)}}>
						<PlusSmIcon className='inline h-4 mr-1'/>
						<span>
							Ajouter un filtre de status
						</span>
					</button>
				</div>
			</div>
			<div className="relative h-full rounded-md shadow-sm w-64">
        <div className="pointer-events-none h-full absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-grey-500" aria-hidden="true" />
        </div>
        <input
					onChange={(e)=> handleSearchFilterChange(e) }
					value={filters.search}
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

function ModalFilterChoose({isOpen, filters, setFilters}:{isOpen:boolean, filters:Filters, setFilters:Function}) {
	

	function addStatusFilter(statusAdded:Status, e:React.FormEvent<HTMLInputElement>){
		if(e.currentTarget.checked  && !filters.status.includes(statusAdded)){
			setFilters(({...filters, status: [...filters.status, statusAdded]}))
		}
		else{
			setFilters(({...filters, status: filters.status.filter(s => s !== statusAdded)}))
		}
	}

	return (
		<div className={isOpen ? 'absolute bottom-0 -translate-y-[-100%] z-10' : 'hidden'} aria-hidden={!isOpen}>
		<form className='flex flex-col p-4 text-grey-500 bg-grey-50 border border-grey-300 min-w-[200px]'>
			<h6 className='mb-2 uppercase font-medium'>Status</h6>
			<span className='mb-0.5'>
				<input 
					onChange={(e)=>addStatusFilter(Status.OPEN, e)}
					checked={filters.status.includes(Status.OPEN)}
					id="open"
					type="checkbox"
					className="mr-2 rounded-sm focus:ring-secondary"
				/>
				<label htmlFor="open">Ouvert</label>
			</span>
			<span className='mb-0.5'>
				<input
					onChange={(e)=>addStatusFilter(Status.IN_PROGRESS, e)}
					checked={filters.status.includes(Status.IN_PROGRESS)}
					id="in-progress"
					type="checkbox"
					className="mr-2 rounded-sm focus:ring-secondary"
				/>
				<label htmlFor="in-progress">En cours</label>
			</span>
			<span className='mb-0.5'>
				<input onChange={(e)=>addStatusFilter(Status.REVIEW, e)} checked={filters.status.includes(Status.REVIEW)} id="review" type="checkbox" className="mr-2 rounded-sm focus:ring-secondary"/>
				<label htmlFor="review">En revue</label>
			</span>
			<span className='mb-0.5'>
				<input onChange={(e)=>addStatusFilter(Status.CLOSED, e)} checked={filters.status.includes(Status.CLOSED)} id="close" type="checkbox" className="mr-2 rounded-sm focus:ring-secondary"/>
				<label htmlFor="close">Fermé</label>
			</span>
		</form>
	</div>
			)
}