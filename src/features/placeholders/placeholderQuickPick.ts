import {
	getPlaceholderType,
	getPlaceholderTypes,
	type PlaceholderType,
} from "../../core/placeholders/placeholderType";
import { LionizationPickItem, showQuickPick } from "../../ui/quickPick/showQuickPick";

export async function showPlaceholderQuickPick(variable: string): Promise<PlaceholderType> {
	const placeholderTypeValue = await showQuickPick(
		`Choose the type for the variable ${variable}`,
		getPlaceholderTypes().map((p) => new LionizationPickItem(p)),
	);
	const placeholderType = getPlaceholderType(placeholderTypeValue);
	if (typeof placeholderType === "undefined") {
		throw new Error(`Unknown placeholder type: ${placeholderTypeValue}`);
	}
	return placeholderType;
}
