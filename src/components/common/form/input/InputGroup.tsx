
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ErrorInput } from './ErrorInput';
import { ExclamationCircleIcon } from '@heroicons/react/outline'
//Styles
import styles from "../input/InputGroup.module.css"

interface IProps  {
	label: string
	type: string
	field: string
	placeholder: string
	autoComplete?: string
	register: UseFormRegister<any>
	errors: Record<string, FieldError>
	validator?: any
}


export const InputGroup = ({ label, type, placeholder, autoComplete, register, validator, field, errors}:IProps) => {

  return   (
		<div className=''>
				<label className={styles.label} htmlFor={field}>{label}</label>
				<div className='relative'>
					<input 
						className={styles.input}
						id={field}
						type={type}
						{...register(field, validator[field])}
						aria-invalid={errors[field] ? 'true' : 'false'} 
						placeholder={placeholder}
						autoComplete={autoComplete}
					/>
					
					{errors[field] && <ExclamationCircleIcon className='absolute h-4 top-1/2 right-2 transform -translate-y-1/2 stroke-alert_dark '/>}
				</div>
				{errors[field] &&<ErrorInput errors={errors} field={field}/>}
		</div>
	)
	}



