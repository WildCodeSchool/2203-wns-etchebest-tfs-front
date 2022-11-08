import ExclamationCircleIcon from '@heroicons/react/outline/ExclamationCircleIcon'
import React, { ReactNode } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { Priority } from '../../../../types'
import { ErrorInput } from '../input/ErrorInput'
import styles from '../input/InputGroup.module.css'

interface SelectGroupProps {
  children: ReactNode,
  label: string,
  field: string,
  register: UseFormRegister<any>
  placeholder: string,
  validator?: any,
  errors: Record<string, FieldError>
}

export function SelectGroup({children, label, field, register, validator, errors, placeholder}:SelectGroupProps) {

  return (
    <div>
        <label htmlFor={ field } className={styles.label}>{label}</label>
        <div className="relative">
          <select {...register(field, validator ? validator[field] : null)} name={field} id={field} className={styles.input}>
            <option value="" className='text-grey-400 focus:text-grey-400'>{ placeholder }</option>
            { children }
          </select>
          {errors[field] && <ExclamationCircleIcon className='absolute h-4 top-1/2 right-8 transform -translate-y-1/2 stroke-alert_dark '/>}
        </div>
      {errors[field] &&<ErrorInput errors={errors} field={field}/>}
    </div>
  )
}
