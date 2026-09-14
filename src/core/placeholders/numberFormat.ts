export const validNumberFormats = [
	"compact",
	"compactCurrency",
	"compactSimpleCurrency",
	"compactLong",
	"currency",
	"decimalPattern",
	"decimalPercentPattern",
	"percentPattern",
	"scientificPattern",
	"simpleCurrency",
];

export const numberFormatsWithSymbol = ["compactCurrency", "currency"];

export function includeInSymbol(value: string): boolean {
	return numberFormatsWithSymbol.includes(value);
}

export const numberFormatsWithDecimalDigits = [
	"compactCurrency",
	"compactSimpleCurrency",
	"currency",
	"decimalPercentPattern",
	"simpleCurrency",
];

export function includeInDecimalDigits(value: string): boolean {
	return numberFormatsWithDecimalDigits.includes(value);
}

export const numberFormatsWithCustomPattern = ["currency"];

export function includeInCustomPattern(value: string): boolean {
	return numberFormatsWithCustomPattern.includes(value);
}
