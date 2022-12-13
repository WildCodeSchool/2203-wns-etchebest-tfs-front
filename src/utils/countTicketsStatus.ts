import { Ticket } from "../types";

type Status = "OPEN" | "IN_PROGRESS" | "REVIEW" | "CLOSED"

export default function countTicketsByStatus(tickets:Ticket[] | undefined, statusType: Status): number {
  if(!tickets) return 0
  return tickets?.filter(ticket => ticket.status === statusType ).length || 0
}