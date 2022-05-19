import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql
} from '@apollo/client'
import Head from 'next/head'

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_API_URI,
	cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
			</Head>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false })
