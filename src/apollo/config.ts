import {
	ApolloClient,
	InMemoryCache,
	createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_API_URI,
	credentials: 'same-origin'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})
