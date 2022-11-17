import {
  PlaceholderType,
  PlaceholderTypeItem,
  getPlaceholderType,
  getPlaceholderTypes
} from './placeholderType';
import { showQuickPick } from '../quickPick/showQuickPick';

export async function showPlaceholderQuickPick(
  variable: string
): Promise<PlaceholderType> {
  const placeholderTypeValue = await showQuickPick(
    `Choose the type for the variable ${variable}`,
    getPlaceholderTypes().map((p) => new PlaceholderTypeItem(p))
  );
  return getPlaceholderType(placeholderTypeValue);
}
