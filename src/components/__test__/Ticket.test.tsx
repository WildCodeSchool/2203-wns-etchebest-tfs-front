import Ticket from '../ticket/Ticket'
import { screen, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'

test.skip('ticket', () => {
	render(
		<MockedProvider>
			<Ticket
				id={1}
				title='Rendez - vous client'
				description='Préparer le projet, pour le rendez - vous de lundi '
				status='A traiter' 
				createdAt={''}			/>
		</MockedProvider>
	)
	expect(screen.queryByText(/Rendez - vous client/i)).toBeInTheDocument()
})
