import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState, useContext, useLayoutEffect } from 'react'
import { GET_ME } from '../apollo/queries'
import { MeData, Role, User } from '../types'
import { AuthContext } from '../UserContext'

interface UseGuardByRole {
	authedUser: User | null
	isAllow: boolean
}

/**
 * @param role Array of Roles - Enum
 * @param redirectPath Optional argument - redirect path if unauthorized (ex: "/login") - Default: previous page
 * @returns  - {authedUser, isAllow} - authedUser: User | null - isAllow: boolean
 */

export function useGuardByRoles(role: Role[], redirectPath?: string): UseGuardByRole {
	const router = useRouter()
	const [authedUser, setAuthedUser] = useState<User | null>(null)
	const authCtx = useContext(AuthContext)
	const [getMe] = useLazyQuery<MeData>(GET_ME, {
		fetchPolicy: 'no-cache' // Do not use cache for this query
	})

	useLayoutEffect(() => {
		;(async () => {
			await getMe().then(({ data }) => {
				if (data && data.me && role.includes(data.me.role)) {
					authCtx?.setAuthUser(data.me) // Set authedUser to context
					setAuthedUser(data.me)
				} else {
					redirectPath ? router.push(redirectPath) : router.back
				}
			})
		})()
	}, [])
	return { authedUser, isAllow: !!authedUser }
}
