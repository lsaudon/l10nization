import {
  NumberFormat,
  NumberFormatItem,
  getNumberFormat,
  getNumberFormats
} from './numberFormat';
import { showQuickPick } from '../quickPick/showQuickPick';

export async function showNumberFormatQuickPick(
  variable: string
): Promise<NumberFormat> {
  const numberFormatValue = await showQuickPick(
    `Choose the number format for the variable ${variable}`,
    getNumberFormats().map((p) => new NumberFormatItem(p))
  );
  return getNumberFormat(numberFormatValue);
}
