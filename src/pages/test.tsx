import type { NextPage } from 'next'
import Head from 'next/head'
//Components
import BaseLayout from '../layout/BaseLayout';
//hooks
import { useGuardByRoles } from '../hooks/useGuardByRoles';
import { GUARD_ROUTES } from '../GuardConfig';
import { NextRouter, useRouter } from 'next/router';

const TestPage: NextPage = () => {

	const {authedUser, isAllow} = useGuardByRoles(GUARD_ROUTES.test.page, "/")
	const router = useRouter()
	console.log(router)

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
					<div>Rôle de la route: <ul>{GUARD_ROUTES.test.page.map((r,i)=><li key={i}>{r}</li>)}</ul></div>
      	</div>
				<Crumbread router={router}/>
				</BaseLayout>	}
		</>
	)
}

export default TestPage

function Crumbread({router}:{router:NextRouter}) {

	function getCrumbread(router:NextRouter) {
		const routes = router.asPath.split("/")
		
		const crumbread = routes.map((r,i)=>{
			if(i===0) return {name:"Home", path:"/"}
			else return {name:"blabla", path:routes.slice(0,i+1).join("/")}
		})
		return crumbread
	}

	console.log(getCrumbread(router))


	return (
		<div className="block">
	  <nav aria-label="Breadcrumb 2" className="vtmn-breadcrumb">
	    <ol>
	      <li>
	        <span className="vtmx-home-line" aria-hidden="true"></span>
					<a href="">Home</a>
	      </li>
	      <li><a href="">New</a></li>
	      <li><a href="">Children</a></li>
	      <li aria-current="page">Tee-shirt</li>
	    </ol>
	  </nav>
	</div>
)
}