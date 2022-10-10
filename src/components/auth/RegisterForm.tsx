import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
//Libraries
import { SubmitHandler, useForm } from 'react-hook-form'
import { OperationVariables, QueryResult, useLazyQuery, useMutation } from '@apollo/client'
//Component
import Button from '../Button'
//Queries
import { IS_EXIST_USER, REGISTER_USER } from '../../apollo/queries'
//Utils
import { isEmpty } from '../../utils/objectIsEmpty'
import { InputGroup } from '../common/form/input/InputGroup'

interface IRegisterFormData {
	firstname: string
	lastname: string
	email: string
	password: string
	confirmPassword: string
}

export function RegisterForm() {
	const [getisExistUser] = useLazyQuery(IS_EXIST_USER)

	//Form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm<IRegisterFormData>({ mode: 'onTouched' })

	const validators = {
		firstname: {
			required: {
				value: true,
				message: 'Le prénom est requis'
			},
			pattern: {
				value: /[A-Za-z]$/g,
				message: 'Le prénom doit comporter uniquement des lettres'
			},
			minLength: {
				value: 2,
				message: 'Le prénom doit faire au moins 2 caractères'
			}
		},
		lastname: {
			required: {
				value: true,
				message: 'Le nom est requis'
			},
			pattern: {
				value: /[A-Za-z]$/g,
				message: 'Le nom doit comporter uniquement des lettres'
			},
			minLength: {
				value: 2,
				message: 'Le nom doit faire au moins 2 caractères'
			}
		},
		email: {
			required: {
				value: true,
				message: "L'email est requis"
			},
			pattern: {
				value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				message: 'Adresse email non valide'
			},
			validate: {
				isExist: async (value: string): Promise<boolean | string> => {
					const response = await getisExistUser(
						{ variables: 
							{ 
								data: {email:value} 
							} 
						})
						console.log(response)
					return !response.data.isExistUser || 'Adresse email déjà utilisée'
				}
			}
		},
		password: {
			required: {
				value: true,
				message: 'Le mot de passe est requis'
			},
			minLength: {
				value: 8,
				message: 'Le mot de passe doit contenir au moins 8 caractères.'
			},
			maxLength: {
				value: 20,
				message: 'Le mot de passe ne doit pas dépasser 20 caractères.'
			}
		},
		confirmPassword: {
			required: {
				value: true,
				message: 'La confirmation mot de passe est requise'
			},
			minLength: {
				value: 8,
				message: 'Le mot de passe doit contenir au moins 8 caractères.'
			},
			validate: {
				isSame: (value: string) =>
					value === watch('password') || 'Les mots de passe ne correspondent pas'
			}
		}
	}

	//Mutation
	const [mutateRegister, { loading, error: ApolloError }] = useMutation(REGISTER_USER)

	const router = useRouter()

	const onSubmit: SubmitHandler<IRegisterFormData> = data => {
		// on enlève confirmPassword de l'objet data
		const { confirmPassword, ...rest } = data

		const response = mutateRegister({ variables: { data: rest } })
		response
			.then(data => {
				if (data) {
					console.log(data.data.register)
					localStorage.setItem('token', data.data.register)
					router.push('/')
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	return (
		<form className='grid grid-cols-2 gap-3 ' onSubmit={handleSubmit(onSubmit)}>
			{/* firstname */}
			<InputGroup
				label='Prénom'
				type='text'
				field='firstname'
				placeholder='Votre prénom'
				autoComplete='given-name'
				register={register}
				errors={errors}
				validator={validators}
			/>

			{/* lastname */}
			<InputGroup
				label='Nom'
				type='text'
				field='lastname'
				placeholder='Votre nom'
				autoComplete='email'
				register={register}
				errors={errors}
				validator={validators}
			/>

			{/* Email */}
			<div className='col-span-2'>
				<InputGroup
					label='Email'
					type='email'
					field='email'
					register={register}
					errors={errors}
					validator={validators}
					placeholder='email@exemple.com'
					autoComplete='email'
				/>
			</div>

			{/* password */}
			<div className='col-span-2'>
				<InputGroup
					label='Mot de passe'
					type='password'
					field='password'
					register={register}
					validator={validators}
					errors={errors}
					placeholder='Saisissez votre mot de passe'
					autoComplete='new-password'
				/>
			</div>

			{/* Confirm passwors */}
			<div className='col-span-2 mb-5'>
				<InputGroup
					label='Confirmation de passe'
					type='password'
					field='confirmPassword'
					register={register}
					validator={validators}
					errors={errors}
					placeholder='Comfirmez votre mot de passe'
					autoComplete='new-password'
				/>
				{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
			</div>

			<div className='col-span-2'>
				<Button type='submit' fullWidth disabled={!isEmpty(errors)} loading={loading}>
					S'inscrire
				</Button>
				{ApolloError && (
					<p className='my-2 rounded-sm bg-alert px-4 py-2 text-sm font-medium text-white'>
						{ApolloError.message}
					</p>
				)}
			</div>
		</form>
	)
}
