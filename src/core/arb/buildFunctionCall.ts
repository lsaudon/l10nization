export function buildFunctionCall(
	appLocalizationsVariable: string,
	key: string,
	variables: readonly string[],
): string {
	const functionCall = `${appLocalizationsVariable}.${key}`;
	if (variables.length === 0) {
		return functionCall;
	}

	const variablesString = variables
		.map((value, index) => (index === variables.length - 1 ? `${value}` : `${value}, `))
		.reduce((accumulator, part) => accumulator + part, "");

	return `${functionCall}(${variablesString})`;
}
