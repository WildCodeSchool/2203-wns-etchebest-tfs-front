
import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ErrorInput } from './ErrorInput';
import { ExclamationCircleIcon } from '@heroicons/react/outline'
//Styles
import styles from "../input/InputGroup.module.css"


interface InputGroupProps  {
	label: string
	type: string
	field: string
	placeholder: string
	autoComplete?: string
	register: UseFormRegister<any>
	errors: Record<string, FieldError>
	validator?: any
}


export function InputGroup ({ label, type, placeholder, autoComplete, register, validator, field, errors}:InputGroupProps) {

  return   (
		<div>
				<label className={styles.label} htmlFor={field}>{label}</label>
				<div className='relative'>
					<input 
						className={styles.input}
						id={field}
						type={type}
						{...register(field, validator ? validator[field] : null)}
						aria-invalid={errors[field] ? 'true' : 'false'} 
						placeholder={placeholder}
						autoComplete={autoComplete}
					/>
					
					{errors[field] && <ExclamationCircleIcon className='absolute h-4 top-1/2 right-2 transform -translate-y-1/2 stroke-alert_dark '/>}
				</div>
				{errors? errors[field] &&<ErrorInput errors={errors} field={field}/> : null}
		</div>
	)
	}



