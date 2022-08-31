export default function formatDate(date: string): string {
	return new Date(date).toLocaleDateString('FR-fr', { timeZone: 'UTC' })
}
