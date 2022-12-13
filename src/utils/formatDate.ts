export default function formatDate(date: string | Date): string {
	return new Date(date).toLocaleDateString('FR-fr', { timeZone: 'UTC' })
}
