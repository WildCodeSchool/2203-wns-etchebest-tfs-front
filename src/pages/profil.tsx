import { NextPage } from "next"
import { Head } from "next/document"
import { GUARD_ROUTES } from "../GuardConfig"
import { useGuardByRoles } from "../hooks/useGuardByRoles"
import BaseLayout from "../layout/BaseLayout"

const ProfilPage: NextPage = () => {

	const {authedUser, isAllow} = useGuardByRoles(GUARD_ROUTES.profil, "/")
	
	return (
		<>
			 {/* <Head>
				<title>Test page</title>
			</Head> */}
      {isAllow && <BaseLayout name={"Profile"}>
        <div className="max-w-sm">
					<p>{authedUser?.firstname}</p>
					<p>{authedUser?.lastname}</p>
					<p>{authedUser?.email}</p>
      	</div>
				</BaseLayout>	}
		</>
	)
}

export default ProfilPage