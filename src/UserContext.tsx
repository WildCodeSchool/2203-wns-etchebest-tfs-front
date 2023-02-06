import { createContext, Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { User } from './types'

export type IAuthUserCtx = Pick<User, 'firstname' | 'lastname' | 'email' | 'role'>

export interface IAuthCtx {
	authUser: IAuthUserCtx | null
	setAuthUser: Dispatch<SetStateAction<IAuthUserCtx | null>>
}

export const AuthContext = createContext<IAuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactElement[] }) {
	const [authUser, setAuthUser] = useState<IAuthUserCtx | null>(null)
	const value = { authUser, setAuthUser }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
