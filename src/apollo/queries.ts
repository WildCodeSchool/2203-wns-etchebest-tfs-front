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