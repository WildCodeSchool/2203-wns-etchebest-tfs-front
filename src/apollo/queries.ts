import { gql } from "@apollo/client";


export const GET_TICKETS = gql`
	query Tickets {
		tickets {
			id
			title
			description
			status
			createdAt
		}
	}
`

export const GET_PROJECTS = gql`
	query Projects {
		projects {
			createdAt
			id
			subject
		}
	}
`

export const REGISTER_USER = gql`
	mutation Register($data: UserCreateInput!) {
		register(data: $data)
	}
`