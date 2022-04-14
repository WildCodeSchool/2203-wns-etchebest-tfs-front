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

const client = new ApolloClient({
	uri: process.env.API_URI,
	cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}

// Disabling SSR
export default dynamic(() => Promise.resolve(MyApp), { ssr: false })
