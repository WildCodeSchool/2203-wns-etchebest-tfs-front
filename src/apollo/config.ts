// config APOLLO Client

import {
	ApolloClient,
	InMemoryCache,
	createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

// fourni url backend
const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_API_URI,
	credentials: 'same-origin'
})

// A chaque requềte, récupère le token stocké dans le local storage
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
