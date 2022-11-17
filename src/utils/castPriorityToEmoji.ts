import { Priority } from "../types"

export const castPriorityToEmoji = (priority: Priority) => {
  switch (priority) {
    case 'LOW':
      return '🚀'
    case 'MEDIUM':
      return '🚀🚀'
    case 'HIGH':
      return '🚀🚀🚀'
    default:
      return 'ERROR PRIORITY CAST'
  }
}