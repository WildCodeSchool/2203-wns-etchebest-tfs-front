import Badge from '../../components/Badge'

const classes = {
	titles: 'text-grey-500 font-medium uppercase',
	subTitles: 'text-grey-500'
}

const TicketDataLine = ({title, children}: any) => {
	return (
		<>
			<div>
				<p className={classes.subTitles}>{title}</p>
			</div>
			<div>{children}</div>
		</>
	)
}

const UserView = ({data}: any) => {
	return (
		<div className={'inline-flex items-center'}>
			<div className={'h-5 w-5 bg-grey-500 rounded-full mr-1'}></div>
			{data.name}
		</div>
	)
}

export default function TicketRightPanel() {
	return (
		<div className={'w-5/12 p-12 relative h-full overflow-auto'}>
			<div>
				<h2 className={classes.titles}>Status: </h2>
			</div>
			<div className={'grid grid-cols-2 space-y-4 mt-12'}>
				<TicketDataLine title={'Projet :'}>Nom du projet</TicketDataLine>
				<TicketDataLine title={'Priorité :'}></TicketDataLine>
				<TicketDataLine title={'Auteur :'}><UserView data={{name: 'Marion Toto'}} /></TicketDataLine>
				<TicketDataLine title={'Assigné à :'}><UserView data={{name: 'Teddy Titi'}} /></TicketDataLine>
				<TicketDataLine title={'Labels :'}><Badge>Bug</Badge> <Badge>Intégration</Badge></TicketDataLine>
				<div className={'col-span-2'}>
				<p className={classes.subTitles}>Estimation du temps :</p>
				</div>
				<div className={'col-span-2 flex justify-center'}>
					<div className={'h-40 w-40 rounded-full bg-grey-500 flex items-center justify-center'} style={{
						background: 'conic-gradient(from 90deg at 50% 50%, rgba(22, 78, 99, 1) 60%, rgba(13, 148, 136, 1) 60%, rgba(13, 148, 136, 1) 100%)'
					}}>
						<div>
							<p className={'text-sm h-32 w-32 bg-white rounded-full flex items-center justify-center'}>
								<span className={'text-secondary'}>13mins |</span> 
								
								<span className={'text-primary font-bold ml-1'}>20mins</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={'absolute bottom-0 pt-12 text-grey-500 text-xs left-6'}>
				<p>Created september 17, 2022, 14.56 PM</p>
				<p>Updated at September 18, 2022, 09:32 AM</p>
			</div>
		</div>
	)
}