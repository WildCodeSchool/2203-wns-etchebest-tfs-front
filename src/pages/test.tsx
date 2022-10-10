import type { NextPage } from 'next'
import Head from 'next/head'


import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext, IAuthUserCtx } from '../UserContext'
import Router, { useRouter } from 'next/router'

import { useLazyQuery } from '@apollo/client'
import { GET_ME } from '../apollo/queries'


const TestPage: NextPage = () => {

	const [getMe,{ loading, data }] = useLazyQuery(GET_ME)
	const authCtx = useContext(AuthContext);
	const router = useRouter()

	useLayoutEffect(() => {
		const userLogged = async () => {
		const data = await getMe()
		const user = data.data.me
		redirectAccordingRole(user, "ADMIN")
		}
		userLogged().catch(console.error);	
	}, [])

	function redirectAccordingRole(user:IAuthUserCtx, roles:string){
		if(!user){
			authCtx?.setAuthUser(user)
			router.push('/')
		}
		else if(user && user.roles === roles){
			authCtx?.setAuthUser(user)
		}
		else{
			authCtx?.setAuthUser(user)
			router.push('/')
		}
	}

	return (
		<>
			<Head>
				<title>Test page</title>
			</Head>

      {authCtx?.authUser && 
				<div className="max-w-sm">
				<h1>Page test</h1>
      </div>}
			
			
		</>
	)
}

export default TestPage