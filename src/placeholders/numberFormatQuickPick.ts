import { LionizationPickItem, showQuickPick } from '../quickPick/showQuickPick';
import { validNumberFormats } from './numberFormat';

export async function showNumberFormatQuickPick(
  variable: string
): Promise<string> {
  const numberFormatValue = await showQuickPick(
    `Choose the number format for the variable ${variable}`,
    validNumberFormats.map((p) => new LionizationPickItem(p))
  );
  return numberFormatValue;
}
