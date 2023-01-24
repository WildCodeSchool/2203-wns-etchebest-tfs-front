import { gql } from "@apollo/client";

//------------ AUTH ----------------
export const REGISTER_USER = gql`
	mutation Register($data: RegisterInput!) {
		register(data: $data)
	}
`


//-------------- TICKETS --------------

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
export const DELETE_TICKET = gql`
	mutation DeleteTicket($where: TicketWhereUniqueInput!) {
	  deleteTicket(where: $where) {
	    id
      title
	  }
	}
`


//--------------- PROJECTS ----------------

export const CREATE_PROJECT = gql`
mutation CreateProject($data: ProjectCreateInput!) {
  createProject(data: $data) {
    id
    title
  }
}
`

export const UPDATE_PROJECT = gql`
mutation UpdateProject($data: ProjectUpdateInput!, $where: ProjectWhereUniqueInput!) {
  updateProject(data: $data, where: $where) {
    id
    title
    subject
  }
}
`

export const DELETE_PROJECT = gql`
mutation DeleteProject($where: ProjectWhereUniqueInput!) {
  deleteProject(where: $where) {
    id
  }
}
`

//--------------- USER ----------------

export const DELETE_USER = gql`
mutation DeleteUser($where: UserWhereUniqueInput!) {
  deleteUser(where: $where) {
    id
    firstname
    lastname
  }
}
`