import { gql } from "@apollo/client";

//-------------- TICKETS --------------
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

export const CREATE_TICKET = gql`
mutation CreateTicket($data: TicketCreateInput!) {
  createTicket(data: $data) {
    id
    labels {
      name
    }
  }
}
`
//------------ PROJECT ------------
export const GET_PROJECTS = gql`
query Projects {
  projects {
    id
		title
    subject
    createdAt
    updatedAt
		tickets {
      status
    }
		members {
      firstname
      lastname
    }
		user_author_project_id
  }
}
`

export const GET_PROJECT = gql `
query GetProject($where: ProjectWhereUniqueInput!) {
  project(where: $where) {
    title
    id
    code
    tickets {
      id
      title
			updatedAt
      priority
			status
      labels {
        name
      }
			user_author {
        firstname
        lastname
      }
    }
  }
}
`


//----------- USER ------------
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

export const IS_EXIST_USER = gql`
query IsExistUser($data: isExistUserInput!) {
  isExistUser(data: $data)
}`


//----------- AUTH ------------
export const LOGIN_MUTATION = gql`
	mutation Mutation($data: LoginInput!) {
		login(data: $data)
	}
`

export const REGISTER_USER = gql`
	mutation Register($data: UserCreateInput!) {
		register(data: $data)
	}
`