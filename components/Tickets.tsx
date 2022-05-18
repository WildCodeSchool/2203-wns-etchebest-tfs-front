import { useState } from 'react'
import styles from '../styles/CounterStyles.module.css'

import { gql, useQuery } from '@apollo/client'
import { listenerCount } from 'process'

const GET_TICKETS = gql`
	query Tickets {
		tickets {
			id
			title
			description
			status
		}
	}
`

const Tickets = () => {
	const { loading, error, data } = useQuery(GET_TICKETS)

	if (loading) return <p>'Loading...'</p>
	if (error) return <p>{`Error! ${error.message}`}</p>

	return (
		<>
			<p>Tickets</p>
			<pre>{JSON.stringify(data.tickets, null, 2)}</pre>
		</>
	)
}

export default Tickets
