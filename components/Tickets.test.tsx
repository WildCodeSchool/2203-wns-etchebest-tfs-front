import { getByText, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import Tickets from './Tickets'
import { GET_TICKETS } from './Tickets'

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
		const e = await waitFor(() => screen.getByText(/ddfdf/i))
		expect(e).toBeInTheDocument()
	})
})
