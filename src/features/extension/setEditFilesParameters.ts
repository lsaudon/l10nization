import { Placeholder } from "../../core/arb/placeholder";
import { PlaceholderType } from "../../core/placeholders/placeholderType";
import { camelize } from "../../core/shared/camelize";
import { Configuration } from "../../infrastructure/shared/configuration";
import { extractInterpolatedVariables } from "../../infrastructure/shared/parser/parser";
import { showInputBox } from "../../ui/inputBox/showInputBox";
import { LionizationPickItem, showQuickPick } from "../../ui/quickPick/showQuickPick";
import type { CommandParameters } from "../commands/commandParameters";
import { EditFilesParameters } from "../commands/editFilesParameters";
import { showDateFormatQuickPick } from "../placeholders/dateFormatQuickPick";
import {
	includeInCustomPattern,
	includeInDecimalDigits,
	includeInSymbol,
	validNumberFormats,
} from "../placeholders/numberFormat";
import { showPlaceholderQuickPick } from "../placeholders/placeholderQuickPick";
import { KeyValuePair } from "./keyValuePair";

async function getPlaceholder(variable: string) {
	const name = await showInputBox(`Enter the name of the variable ${variable}`, camelize(variable));
	const placeholderType = await showPlaceholderQuickPick(name);

	let placeholder = new Placeholder(name, variable, placeholderType);

	switch (placeholderType) {
		case PlaceholderType.DateTime: {
			const format = await showDateFormatQuickPick(name);
			placeholder = placeholder.addFormat(format);
			break;
		}
		case PlaceholderType.Int:
		case PlaceholderType.Num:
		case PlaceholderType.Double: {
			const numberFormats: string[] = [];
			if (placeholderType === PlaceholderType.Int) {
				numberFormats.push("none");
			}
			numberFormats.push(...validNumberFormats);
			const format = await showQuickPick(
				`Choose the number format for the variable ${variable}`,
				numberFormats.map((p) => new LionizationPickItem(p)),
			);
			if (format !== "none") {
				placeholder = placeholder.addFormat(format);
				if (includeInSymbol(format)) {
					const symbol = await showInputBox(`Choose the symbol for the variable ${name}`, "");
					placeholder = placeholder.addSymbol(symbol);
				}
				if (includeInDecimalDigits(format)) {
					const decimalDigits = await showInputBox(
						`Choose the decimal digits for the variable ${name}`,
						"",
					);
					placeholder = placeholder.addDecimalDigits(Number(decimalDigits));
				}
				if (includeInCustomPattern(format)) {
					const customPattern = await showInputBox(
						`Choose the custom pattern for the variable ${name}`,
						"",
					);
					placeholder = placeholder.addCustomPattern(customPattern);
				}
			}
			break;
		}
		default:
			break;
	}

	return placeholder;
}

export async function setEditFilesParameters(
	commandParameters: CommandParameters,
): Promise<EditFilesParameters> {
	const key = await showInputBox("Enter the message name", camelize(commandParameters.value));

	let description = null;
	if (Configuration.getInstance().getHaveDescription()) {
		description = await showInputBox("Enter the description", "");
	}

	const variables = extractInterpolatedVariables(commandParameters.value);
	const placeholders: Placeholder[] = [];
	if (Array.isArray(variables)) {
		for (const variable of variables) {
			placeholders.push(await getPlaceholder(variable));
		}
	}

	return new EditFilesParameters(
		commandParameters.uri,
		commandParameters.range,
		new KeyValuePair(key, commandParameters.value),
		description,
		placeholders,
	);
}
