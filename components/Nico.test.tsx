import { render, screen } from '@testing-library/react'
import Nico from './Nico'

describe('Home page', () => {
	it('renders learn react link', () => {
		render(<Nico />)
		expect(screen.queryByText(/Nico/i)).toBeInTheDocument()
	})
})
