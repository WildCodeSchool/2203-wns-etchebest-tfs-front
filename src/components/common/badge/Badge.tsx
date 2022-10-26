import type {ReactElement } from 'react'
import classNames from '../../../utils/classNames'

import styles from '../badge/badge.module.css'


interface BadgeProp {
	children: ReactElement | string
	className?: string 
  onClose?: Function
}

export default function Badge(props: BadgeProp) {
  const {children, className, onClose, ...rest} = props

  return (
    <span 
      className={classNames(
        styles.badge,
        onClose ? 'pl-2.5 pr-1' : 'px-2',
       className ?? ''
       )}
      {...rest}
      >
      {children}
        {
          onClose && <button
            type="button"
            className={styles.badgeButton}
            onClick={(e) => onClose(e)}
          >
            <span className="sr-only">Remove large option</span>
            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        }
      </span>
  )
}