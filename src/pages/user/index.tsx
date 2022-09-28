import Head from 'next/head'
import type { NextPage } from 'next'
//Components
import BaseLayout from '../../layout/BaseLayout'
import {FormUpload} from '../../components/common/form/FormUpload'

const UserPage: NextPage = () => {
	
	
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Utilisateurs</title>
			</Head>
			<BaseLayout name={'Utilisateurs'}>
				<FormUpload/>
			</BaseLayout>
		</div>
	)
}

export default UserPage
