export function logObjectVariable(variable: object): string {
	return JSON.stringify(variable, null, 2)
}
