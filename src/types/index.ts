import { RegisterOptions } from 'react-hook-form'

// ------------------- Model ------------------------
export interface User {
	id: number
	firstname: string
	lastname: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	comments: Comment[]
	tickets_author: Ticket[]
	tickets_assign: Ticket[]
	roles: Role
	projects: Project[]
	projects_author: Project[]
}

export interface Ticket {
	id: number
	title: string
	description: string
	status: Status
	priority: Priority
	time_estimation: Date
	files: File[]
	createdAt: Date
	updatedAt: Date
	user_author: User
	user_author_id: number
	user_assign: User
	user_assign_id: number
	project: Project
	project_id: number
	comments: Comment[]
	labels: Label[]
}

export interface File {
	id: number
	name: string
	url: string
	size: number
	createdAt: Date
	updatedAt: Date
	ticket: Ticket
	ticket_id: number
}

export interface Comment {
	id: number
	content: string
	createdAt: Date
	updatedAt: Date
	author: User
	author_id: number
	ticket: Ticket
	ticket_id: number
}

export interface Project {
	id: Readonly<number>
	title: string
	subject: string
	code: string
	createdAt: Date
	updatedAt: Date
	tickets: Ticket[]
	members: User[]
	user_author_project: User
	user_author_project_id: number
}

export interface Label {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
	tickets: Ticket[]
}

export enum Role {
	USER = "USER",
	ADMIN = "ADMIN"
}

export enum Status {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	REVIEW = "REVIEW",
	CLOSED = "CLOSED"
}

export enum Priority {
	LOW = "LOW",
	MEDIUM = "MEDIUM",
	HIGH = "HIGH"
}

// ----------------- FORM --------------------------

// Exemple : type ValidatorFormLogin = ValidatorForm<"email" | "password">
export type ValidatorForm<K extends string> = Record<K, RegisterOptions>


// -------------------  API RESPONSE ------------------------

/* For query "GET_TICKETS"  ex: useQuery<TicketsData>(GET_TICKETS) */
export interface TicketsData {
	tickets: Ticket[]
}

/* For query "GET_PROJECTS"  ex: useQuery<ProjectsData>(GET_PROJECTS) */
export interface ProjectsData {
  projects: Project[]
}

/* For query "GET_PROJECT"  ex: useQuery<ProjectData>(GET_PROJECT) */
export interface ProjectData {
  project: Project
}

/* For query "GET_ME"  ex: useQuery<MeData>(GET_ME) */
export interface MeData {
	me: User
}

/* For query "GET_TICKET"  ex: useQuery<MeData>(GET_TICKET) */
export interface TicketData {
	ticket: Ticket
}

/* For query "GET_TICKET_COMMENTS"  ex: useQuery<MeData>(GET_TICKET_COMMENTS) */
export interface CommentsData {
	comments: Comment[]
}

/* For query "UPDATE_STATUS"  ex: useMuattation<MeData>(UPDATE_STATUS) */
export interface UpdateStatusData {
	updateTicket: Pick<Ticket, "id" | "status">
}


