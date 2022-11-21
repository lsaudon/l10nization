import { QuickPickItem } from 'vscode';

export enum NumberFormat {
  none = 'none',
  compact = 'compact',
  // compactCurrency = 'compactCurrency',
  // compactSimpleCurrency = 'compactSimpleCurrency',
  compactLong = 'compactLong',
  // currency = 'currency',
  decimalPattern = 'decimalPattern',
  // decimalPercentPattern = 'decimalPercentPattern',
  percentPattern = 'percentPattern',
  scientificPattern = 'scientificPattern'
  // simpleCurrency = 'simpleCurrency'
}

export function getNumberFormats() {
  return Object.keys(NumberFormat).filter((p) => isNaN(Number(p)));
}

export function getNumberFormat(numberFormatValue: string) {
  return Object.values(NumberFormat).filter(
    (p) => p === numberFormatValue
  )[0] as NumberFormat;
}

export class NumberFormatItem implements QuickPickItem {
  label: string;

  constructor(label: string) {
    this.label = label;
  }
}
