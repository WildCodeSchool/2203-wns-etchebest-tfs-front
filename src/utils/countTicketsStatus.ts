import { Ticket } from "../types";

type Status = "OPEN" | "IN_PROGRESS" | "CLOSED"

export default function countTicketsByStatus(tickets:Ticket[] | undefined, statusType: Status): number {
  return tickets?.filter(ticket => ticket.status === statusType ).length || 0
}