import type { NextPage } from 'next'
import Head from 'next/head'
//Components
import BaseLayout from '../layout/BaseLayout';
//hooks
import { useGuardByRoles } from '../hooks/useGuardByRoles';
import { GUARD_ROUTES } from '../GuardConfig';

const TestPage: NextPage = () => {

	const {authedUser, isAllow} = useGuardByRoles(GUARD_ROUTES.test, "/login")
	
	return (
		<>
			<Head>
				<title>Test page</title>
			</Head>
      {isAllow && <BaseLayout name={"Test"}>
				<div className="max-w-sm">
					<p>Firstname{authedUser?.firstname}</p>
					<p>Lastname{authedUser?.lastname}</p>
					<p>Email:{authedUser?.email}</p>
					<p>Rôle:{authedUser?.roles}</p>
					<hr />
					<p>Rôle de la route: <ul>{GUARD_ROUTES.test.map((r,i)=><li key={i}>{r}</li>)}</ul></p>
      	</div>
				</BaseLayout>	}
		</>
	)
}

export default TestPage