import type {ReactElement } from 'react'
import classNames from '../utils/classNames'


interface Properties {
	children: ReactElement | string
	className?: string 
  onClose?: Function
}

export default function Badge(props: Properties): ReactElement {
  const {children, className, onClose, ...rest} = props

  return (
    <span 
      className={classNames(
        "inline-flex items-center rounded bg-secondary py-0.5 text-sm font-medium text-white uppercase",
        onClose ? 'pl-2.5 pr-1' : 'px-2.5',
       className ?? ''
       )}
      {...rest}
      >
      {children}
        {onClose && <button
          type="button"
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-primary focus:bg-primary focus:text-white focus:outline-none"
        >
          <span className="sr-only">Remove large option</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button> }
        
      </span>
  )
}