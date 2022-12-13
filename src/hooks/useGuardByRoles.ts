import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState, useContext, useLayoutEffect } from "react";
import { GET_ME } from "../apollo/queries";
import { MeData, Role, User } from "../types";
import { AuthContext } from "../UserContext";


interface UseGuardByRole {
	authedUser:User |null,
	isAllow: boolean
} 

/**
 * 
 * @param roles Tableau de Role(enum)
 * @param redirectPath Arg optionnel - Chemin vers lequel on est redirigé si pas autorisé (ex: "/login") - Par default renvoi à la page précédente 
 * @returns  - {authedUser, isAllow} l'utilisateur connecté si autorisé et un boolean autorisé ou non
 */

export function useGuardByRoles (roles:Role[], redirectPath?:string):UseGuardByRole {

	const router = useRouter()
	const [authedUser, setAuthedUser] = useState<User | null>(null)
	const authCtx = useContext(AuthContext);
	const [getMe] = useLazyQuery<MeData>(GET_ME,  {
		fetchPolicy: "no-cache" //Désactive le cache pour cette query
	})

  authCtx?.authUser

	useLayoutEffect(() => {
		(async ()=> {
			await getMe().then(({data})=>{
        console.log(roles)
				if(data && data.me && roles.includes(data.me.roles)){
					authCtx?.setAuthUser(data.me)  //Set l'utilisateur dans le context
					setAuthedUser(data.me)
				}else {
					redirectPath ? router.push(redirectPath) : router.back
				}
			})
		})()
	}, [])
	return {authedUser, isAllow: !!authedUser}
}