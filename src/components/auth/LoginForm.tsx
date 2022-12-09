import React from 'react'
import { useRouter } from 'next/router'
//Librarie
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
//Component
import Button from '../../components/common/Button'
import { InputGroup } from '../common/form/input/InputGroup'
//Utiles
import { isEmpty } from '../../utils/objectIsEmpty'
// Queries
import { LOGIN_QUERY } from '../../apollo/queries'
//Types
import type { User, ValidatorForm } from '../../types/index'

type LoginFormData = Pick<User, 'email' | 'password'>
type ValidatorLogin = ValidatorForm<keyof LoginFormData>

export default function LoginForm() {
	//Form
	const {
		register,
		handleSubmit,
		formState: { errors, touchedFields }
	} = useForm<LoginFormData>({ mode: 'onTouched' })

	const validators: ValidatorLogin = {
		email: {
			required: {
				value: true,
				message: "L'email est requis"
			},
			pattern: {
				value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				message: 'Adresse email non valide'
			}
		},
		password: {
			required: {
				value: true,
				message: 'Le mot de passe est requis'
			}
		}
	}

	//Mutation
	const [queryLogin, { loading, error: ApolloError }] = useLazyQuery(LOGIN_QUERY)

	const router = useRouter()

	const onSubmit: SubmitHandler<LoginFormData> = payload => {
		queryLogin({
			variables: {
				data: payload
			}
		})
			.then(data => {
				if (data) {
					localStorage.setItem('token', data.data.login)

					router.push('/')
				}
			})
			.catch(err => console.log(err))
	}
	return (
		<form className='form' onSubmit={handleSubmit(onSubmit)}>
			<div className='mb-3'>
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
			<div className='mb-8'>
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
			<Button
				type='submit'
				fullWidth
				loading={loading}
				disabled={!isEmpty(errors) || !Object.keys(touchedFields).length}
			>
				Connexion
			</Button>
			{ApolloError && (
				<p className='px-4 py-2 mt-4 text-sm font-medium text-white rounded-sm bg-alert'>
					{ApolloError.message}
				</p>
			)}
		</form>
	)
}
