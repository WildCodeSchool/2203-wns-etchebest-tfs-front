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

export const GET_ME = gql`
	query Me {
		me {
			id
			firstname
			lastname
			email
			roles
		}
	}
`

export const REGISTER_USER = gql`
	mutation Register($data: UserCreateInput!) {
		register(data: $data)
	}
`

export const LOGIN_MUTATION = gql`
	mutation Mutation($data: LoginInput!) {
		login(data: $data)
	}
`