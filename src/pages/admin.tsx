import type { NextPage } from 'next'
import Head from 'next/head'
//Components
import BaseLayout from '../layout/BaseLayout';
//hooks
import { useGuardByRoles } from '../hooks/useGuardByRoles';
import { GUARD_ROUTES } from '../GuardConfig';
import { NextRouter, useRouter } from 'next/router';
import Table from '../components/common/table/Table';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from '../apollo/queries';
import { UsersData } from '../types';
import { Loader } from '../components/common/Loader';
import { DELETE_USER } from '../apollo/mutations';

const AdminPage: NextPage = () => {

	const {loading,error, data } = useQuery<UsersData>(GET_USERS)
	const [deleteUser] = useMutation(DELETE_USER, {refetchQueries: [{query: GET_USERS}]})

	function handleActionInTable(_: MouseEvent, action: 'delete' | 'edit', id: string) {
		switch (action) {
			case 'edit':
				console.log('edit')
				break
			case 'delete':
				deleteUser({ variables: { where: { id: Number(id) } } })
				break
			default:
				throw new Error(`L'action '${action}' dans le tableau est inconnu`)
		}
	}

  const rowItems = data?.users.map(user => {
		const {
			id,
			firstname,
			lastname,
			roles
		} = user
		
		return [
			id,
			firstname,
			lastname,
			roles
		]
	})

	const {isAllow} = useGuardByRoles(GUARD_ROUTES.admin.page, "/")
	const router = useRouter()
	
	return (
		<>
			<Head>
				<title>Administration</title>
			</Head>
      {isAllow && 
			<BaseLayout name={"Administration"}>
			<>
				<h3 className='mt-8 mb-4 font-medium text-2xl text-secondary'>Utilisateurs</h3>
				<div className="text-primary">
					{loading && 
						<div className="flex bg-grey-200 rounded items-center justify-center p-40">
							<Loader className='h-20'/>
						</div>
					}
					{!loading && <Table
						headerItems={["PRENOM","NOM","ROLE", "ACTIONS"]}
						rowItems={rowItems}
						noResultContent={'Pas dutilisateur'}
						actions=
						{
							{ edit: false,
								delete: true,
								handleClick: (_: MouseEvent, action: 'delete' | 'edit', id: string) => handleActionInTable(_, action, id)
							}
						}
					/>}
					{error && <div className="text-alert">Une erreur est survenue</div>}
				</div>
			</>
			</BaseLayout>	}
		</>
	)
}

export default AdminPage


//----- WIP---------
export function Crumbread({router}:{router:NextRouter}) {

	/* function getCrumbread(router:NextRouter) {
		if(!router || !router.pathname) return []
		return router.pathname.match(/\[([^\]]+)\]/g).map(val => val.slice(1, -1));
	}

	console.log(getCrumbread(router)) */

	return (
		<div className="block">
	  <nav aria-label="Breadcrumb 2" className="vtmn-breadcrumb">
	    <ol>
	      <li>
	        <span className="" >test</span>
					<a href="">Home</a>
	      </li>
				{/* {getCrumbread(router).map((val)=><li>{val}</li>)} */}
	    </ol>
	  </nav>
	</div>
)
}
//--------------