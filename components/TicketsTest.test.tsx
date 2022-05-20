import {  render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Tickets from './TicketsTest'
import { GET_TICKETS } from './TicketsTest'

const mocks = [
	{
		request: {
			query: GET_TICKETS
		},
		result: {
			data: {
				tickets: [
					{
						id: 1,
						title: 'Finir le projet',
						description: "Faire en sorte d'avancer le plus vite",
						status: 'WIP'
					}
				]
			}
		}
	}
]

describe('Tickets', () => {
	it('Should display status', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Tickets />
			</MockedProvider>
		)
		const e = await waitFor(() => screen.getByText(/WIP/i))
		expect(e).toBeInTheDocument()
	})
})
