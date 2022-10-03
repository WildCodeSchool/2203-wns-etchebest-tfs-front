import TicketListRow from './TicketListRow'
import TicketListFilters from './TicketListFilters'

export default function TicketList({tickets}: any) {
	return (
		<div className={'bg-white border border-grey-300 w-full relative'}>
			<TicketListFilters />
			<div className={'relative grid grid-cols-12 border-y border-grey-300 py-4 px-10 gap-4 text-grey-400 uppercase font-semibold text-xs'}>
				<div className={''}>Priority</div>
				<div className={'col-span-5'}>
					Titre
				</div>
				<div className={'text-center'}>
					Label
				</div>
				<div className={'col-span-2'}>
					Statut
				</div>
				<div className={'col-span-2'}>
					Dernière MàJ
				</div>
				<div className={''}>
					Auteur
				</div>
			</div>
			<div className={'relative overflow-auto max-h-[40vh]'}>
				{tickets?.map((ticket: any) => (
					<TicketListRow data={ticket} key={ticket.id} />
					))}
			</div>
		</div>
	)
}