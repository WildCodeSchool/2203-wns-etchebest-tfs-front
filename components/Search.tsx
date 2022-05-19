import { SearchIcon } from '@heroicons/react/outline'
import type { ReactElement } from 'react'
import classNames from '../utils/classNames'

const Search = ({ size }: any): ReactElement => {
	return (
		<SearchIcon className={classNames(size ?? 'h6 w-6', 'text-gray-600')} />
	)
}

export default Search
