import type { NextPage } from 'next'

import Head from 'next/head'
import Image from 'next/image'
import Tickets from '../components/TicketsTest'
import BaseLayout from '../layout/BaseLayout'
import Logo from '../public/logo.png'

const Home: NextPage = () => {
	return (
		<div className={'flex min-h-screen flex-col justify-between bg-gray-50'}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
				{/* 	<link rel='stylesheet' href='https://rsms.me/inter/inter.css' /> */}
			</Head>
			<BaseLayout>
				<Tickets />
			</BaseLayout>
		</div>
	)
}

export default Home
