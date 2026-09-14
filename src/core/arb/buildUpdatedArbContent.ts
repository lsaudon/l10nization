import { notInclude } from "../../features/placeholders/dateFormat";
import { PlaceholderType } from "../placeholders/placeholderType";
import type { L10nObject } from "./l10nObject";
import type { Placeholder } from "./placeholder";
import { sortArb } from "./sortArb";

const hasOptionalParameters = (placeholder: Placeholder): boolean =>
	typeof placeholder.symbol !== "undefined" ||
	typeof placeholder.decimalDigits !== "undefined" ||
	typeof placeholder.customPattern !== "undefined";

const getOptionalParametersMap = (placeholder: Placeholder): Record<string, unknown> => {
	const optionalParameters: Record<string, unknown> = {};
	if (typeof placeholder.symbol !== "undefined") {
		optionalParameters.symbol = placeholder.symbol;
	}
	if (typeof placeholder.decimalDigits !== "undefined") {
		optionalParameters.decimalDigits = placeholder.decimalDigits;
	}
	if (typeof placeholder.customPattern !== "undefined") {
		optionalParameters.customPattern = placeholder.customPattern;
	}
	return optionalParameters;
};

const getPlaceholderMap = (placeholder: Placeholder): Record<string, unknown> => {
	const placeholderMap: Record<string, unknown> = {};
	if (placeholder.type !== PlaceholderType.Plural) {
		placeholderMap.type = placeholder.type;
	}

	switch (placeholder.type) {
		case PlaceholderType.DateTime:
			if (typeof placeholder.format !== "undefined") {
				placeholderMap.format = placeholder.format;
				if (notInclude(placeholder.format)) {
					placeholderMap.isCustomDateFormat = "true";
				}
			}
			return placeholderMap;
		case PlaceholderType.Int:
		case PlaceholderType.Num:
		case PlaceholderType.Double:
			if (typeof placeholder.format !== "undefined") {
				placeholderMap.format = placeholder.format;
				if (hasOptionalParameters(placeholder)) {
					placeholderMap.optionalParameters = getOptionalParametersMap(placeholder);
				}
			}
			return placeholderMap;
		default:
			return placeholderMap;
	}
};

const getPlaceholdersMap = (placeholders: Placeholder[]): Map<string, unknown> =>
	new Map(placeholders.map((placeholder) => [placeholder.name, getPlaceholderMap(placeholder)]));

const replacePlaceholders = (value: string, placeholders: Placeholder[]): string =>
	placeholders.reduce((currentValue, placeholder) => {
		const replacedValue = currentValue.replace(/\$\{?([^\s{}]+)\}?/u, `{${placeholder.name}}`);
		return placeholder.type === PlaceholderType.Plural
			? `{${placeholder.name}, plural, other{${replacedValue}}}`
			: replacedValue;
	}, value);

export function buildUpdatedArbContent(
	text: string,
	l10nKey: L10nObject | null,
	sorted: boolean,
): string {
	const map = new Map<string, unknown>(Object.entries(JSON.parse(text) as Record<string, unknown>));

	if (l10nKey) {
		const { isMetadataEnabled, key, description, value, placeholders } = l10nKey;
		const localizedValue =
			placeholders.length > 0 ? replacePlaceholders(value, placeholders) : value;
		map.set(key, localizedValue);

		if (isMetadataEnabled && (description || placeholders.length > 0)) {
			const entry = {
				...(description && { description }),
				...(placeholders.length > 0 && {
					placeholders: Object.fromEntries(getPlaceholdersMap(placeholders)),
				}),
			};
			map.set(`@${key}`, entry);
		}
	}

	return JSON.stringify(
		Object.fromEntries(sorted ? sortArb(map) : map),
		(_key: string, _value: unknown): unknown => {
			if (typeof _value === "string") {
				return _value.replace(/\\'/gu, "'");
			}
			return _value;
		},
		2,
	);
}
