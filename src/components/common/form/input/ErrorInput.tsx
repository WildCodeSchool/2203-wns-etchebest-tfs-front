import React from 'react'
import { FieldError } from 'react-hook-form'

interface IErrorInputProps {
  errors: Record<string, FieldError>
  field: string
}

export function ErrorInput({errors, field}: IErrorInputProps) {
  console.log({errorInput:{field, errors}})
  return (
      <span className='text-alert_dark text-xs font-normal'>
        <p className="error">{errors[field]?.message}</p>
      </span>
  )
}
