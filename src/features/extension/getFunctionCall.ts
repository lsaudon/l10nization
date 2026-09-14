import { buildFunctionCall } from "../../core/arb/buildFunctionCall";

export function getFunctionCall(
	appLocalizationsVariable: string,
	key: string,
	variables: string[],
): string {
	return buildFunctionCall(appLocalizationsVariable, key, variables);
}
