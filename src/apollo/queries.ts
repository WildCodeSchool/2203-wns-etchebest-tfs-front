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

export const GET_TICKET = gql`
query Query($where: TicketWhereUniqueInput!) {
  ticket(where: $where) {
    id
    title
    description
    priority
    status
    labels {
      name
    }
    time_estimation
    createdAt
    updatedAt
    project {
      title
      id
    }
    user_assign {
      firstname
      lastname
    }
    user_author {
      firstname
      lastname
    }
  }
}`

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
    id
    code
    title
    subject
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
export const LOGIN_QUERY = gql`
	query Login($data: LoginInput!) {
		login(data: $data)
	}
`
//----------- COMMENT ------------

export const GET_TICKET_COMMENTS = gql`
  query Comments($where: CommentWhereInput) {
    comments(where: $where) {
      author {
        firstname
        lastname
      }
      content
      createdAt
      updatedAt
      id
    }
  }`