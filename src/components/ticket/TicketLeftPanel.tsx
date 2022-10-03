import { DocumentAddIcon, PhotographIcon } from '@heroicons/react/outline'

import Button from '../../components/Button'

const classes = {
	titles: 'text-grey-500 font-medium uppercase',
	subTitles: 'text-grey-500'
}

const TicketComment = () => {
	return (
		<div>
			<h2 className={'text-xs text-grey-500'}>John Doe - 10/06/2022</h2>
			<p className={'text-primary text-sm'}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, quae eveniet. Corporis saepe quisquam neque sit excepturi enim sequi odit rem esse autem odio error hic fugit eligendi, quasi aliquam.</p>
		</div>
	)
}

export default function TicketLeftPanel() {
	return (
		<div className={'w-7/12 border-r border-grey-300 h-full overflow-auto pr-12 flex flex-col justify-between'}>
			<h2 className={'text-primary font-medium text-2xl'}>Ceci est le titre du ticket</h2>
			<div className={'mt-8'}>
				<h3 className={classes.titles}>Sujet</h3>
				<p className={'text-primary'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ullam tempore dicta perspiciatis eligendi. Eum veritatis et dolor eveniet blanditiis labore! Saepe suscipit numquam distinctio. Hic nisi omnis quod similique.</p>
			</div>
			<div className={'mt-8'}>
				<h3 className={classes.titles}>Pièces Jointes</h3>
				<div className={'rounded flex flex-col items-center justify-center p-8 outline-dashed outline-2 outline-grey-500 mx-1 mt-4'}>
					<PhotographIcon className={'text-grey-200 h-16 w-16 mb-5'} />
					<Button outlined={true}><DocumentAddIcon className={'w-4 h-4'} /> Ajouter un fichier </Button>
				</div>
			</div>
			<div className={'mt-8 space-y-4'}>
				<h3 className={classes.titles}>Commentaires</h3>
				<div className={'overflow-auto max-h-32 space-y-2'}>
					<TicketComment />
					<TicketComment />
				</div>
				<input
          type="add-comment"
          name="add-comment"
          id="add-comment"
          className='block w-full h-9 p-2  rounded-sm border text-sm text-primary border-grey-500 placeholder-grey-400 placeholder:text-sm focus:border-secondary focus:text-secondary   focus:ring-grey-500'
          placeholder="Ajouter un commentaire"
        />
			</div>
		</div>
	)
}