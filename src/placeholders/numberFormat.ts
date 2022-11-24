export const validNumberFormats = [
  'compact',
  'compactCurrency',
  'compactSimpleCurrency',
  'compactLong',
  'currency',
  'decimalPattern',
  'decimalPercentPattern',
  'percentPattern',
  'scientificPattern',
  'simpleCurrency'
];

export const numberFormatsWithSymbol = ['compactCurrency', 'currency'];

export function includeInSymbol(value: string) {
  return numberFormatsWithSymbol.includes(value);
}

export const numberFormatsWithDecimalDigits = [
  'compactCurrency',
  'compactSimpleCurrency',
  'currency',
  'decimalPercentPattern',
  'simpleCurrency'
];

export function includeInDecimalDigits(value: string) {
  return numberFormatsWithDecimalDigits.includes(value);
}

export const numberFormatsWithCustomPattern = ['currency'];

export function includeInCustomPattern(value: string) {
  return numberFormatsWithCustomPattern.includes(value);
}
