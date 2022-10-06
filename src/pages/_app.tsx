import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo/config'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import '../styles/globals.css'


import {AuthProvider} from '../UserContext'


function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<Head>
					<link rel='icon' href='/favicon.ico' />
					<link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
				</Head>
				<Component {...pageProps} />
			</AuthProvider>
		</ApolloProvider>
	)
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false })
function setContextSRR(arg0: (_: any, { headers }: { headers: any }) => { headers: any }) {
	throw new Error('Function not implemented.')
}

