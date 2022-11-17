import { Status } from "../types"

export const statusTrad = (status: Status) => {
  switch (status) {
    case Status.OPEN:
      return 'Ouvert'
    case Status.IN_PROGRESS:
      return 'En cours'
    case Status.REVIEW:
      return 'En revue'
    case Status.CLOSED:
      return 'Cloturé'
    default:
      throw new Error("Impossible de traduire le status"); 
  }
}