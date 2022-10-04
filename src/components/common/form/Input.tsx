import { forwardRef } from "react"

interface Properties {
	label: string
	id: string | undefined
	name: string
	type?: React.HTMLInputTypeAttribute
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	required?: boolean
	accept?: string,
}

const Input = forwardRef((props: Properties ) => {
	const { label, id, name, type, required, onChange, ...rest } = props
	return (
		<div>
			<label htmlFor={name} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<div className='mt-1'>
				<input
					id={id}
					name={name}
					type={type}
					required={required}
					className='block w-full appearance-none rounded-sm border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm'
					onChange={onChange}
					{...rest}
				/>
			</div>
		</div>
	)
}
)

Input.defaultProps = {
	type: 'text',
	required: false
}

export default Input
