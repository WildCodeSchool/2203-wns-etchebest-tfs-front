import { BellIcon } from '@heroicons/react/outline'
import { ReactElement, useState } from 'react'
import classNames from '../utils/classNames'

const notificationList = [
	{ id: 1, message: 'Ceci est un test' },
	{ id: 2, message: 'Ceci est un test' },
	{ id: 3, message: 'Ceci est un test' },
	{ id: 4, message: 'Ceci est un test' }
]

const Search = ({ size }: any): ReactElement => {
	const [open, setOpen] = useState(false)
	return (
		<div className={'relative'}>
			<div className={'relative cursor-pointer'} onClick={() => setOpen(!open)}>
				<BellIcon className={classNames(size ?? 'h6 w-6', 'text-gray-600')} />
				<div className='absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white '>
					{notificationList.length}
				</div>
			</div>
			{open && (
				<ul
					className={
						'absolute top-10 right-0 min-w-max space-y-2 rounded border border-gray-200 bg-white px-4 py-2 shadow-md'
					}
				>
					{notificationList.map(item => (
						<li key={item.id}>{item.message}</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search
