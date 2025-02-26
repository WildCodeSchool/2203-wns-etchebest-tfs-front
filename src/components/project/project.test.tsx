import { MockedProvider } from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'

import { GET_PROJECTS } from '../../apollo/queries'
import Project from '../../pages/[project]'

const mocks = [
	{
		request: {
			query: GET_PROJECTS
		},
		result: {
			data: {
				projects: [
					{
						createdAt: '2022-05-19T08:38:09.876Z',
						id: 1,
						subject: 'Project test 1'
					},
					{
						createdAt: '2022-04-25T10:38:09.876Z',
						id: 2,
						subject: 'Project 2'
					}
				]
			}
		}
	}
]

describe.skip('Project', () => {
	it('Should display the subject once', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Project />
			</MockedProvider>
		)
		const subjectEl = await waitFor(() => screen.getAllByText(/Project test 1/i))
		expect(subjectEl).toBeInTheDocument
		expect(subjectEl).toHaveLength(1)
	})
	it('Should display the created date formatted once', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<Project />
			</MockedProvider>
		)
		const dateEl = await waitFor(() => screen.getAllByText(/19\/05\/2022/i))
		expect(dateEl).toBeInTheDocument
		expect(dateEl).toHaveLength(1)
	})
})
