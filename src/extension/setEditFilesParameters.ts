/* eslint-disable max-depth */
/* eslint-disable no-await-in-loop */
import { LionizationPickItem, showQuickPick } from '../quickPick/showQuickPick';
import {
  includeInCustomPattern,
  includeInDecimalDigits,
  includeInSymbol,
  validNumberFormats
} from '../placeholders/numberFormat';
import { CommandParameters } from '../commands/commandParameters';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { KeyValuePair } from './keyValuePair';
import { Placeholder } from '../placeholders/placeholder';
import { PlaceholderType } from '../placeholders/placeholderType';
import { camelize } from '../shared/camelize';
import { getVariablesInInterpolation } from '../shared/parser/parser';
import { showDateFormatQuickPick } from '../placeholders/dateFormatQuickPick';
import { showInputBox } from '../inputBox/showInputBox';
import { showPlaceholderQuickPick } from '../placeholders/placeholderQuickPick';

export async function setEditFilesParameters(
  commandParameters: CommandParameters
): Promise<EditFilesParameters> {
  const key = await showInputBox(
    'Enter the message name',
    camelize(commandParameters.value)
  );

  const variables = getVariablesInInterpolation(commandParameters.value);
  const placeholders: Placeholder[] = [];
  if (Array.isArray(variables)) {
    for (const variable of variables) {
      const name = await showInputBox(
        `Enter the name of the variable ${variable}`,
        camelize(variable)
      );
      const placeholderType = await showPlaceholderQuickPick(name);
      let placeholder = new Placeholder(name, variable, placeholderType);
      if (placeholderType === PlaceholderType.DateTime) {
        const format = await showDateFormatQuickPick(name);
        placeholder = placeholder.addFormat(format);
      } else if (
        placeholderType === PlaceholderType.int ||
        placeholderType === PlaceholderType.num ||
        placeholderType === PlaceholderType.double
      ) {
        const numberFormats: string[] = [];
        if (placeholderType === PlaceholderType.int) {
          numberFormats.push('none');
        }
        numberFormats.push(...validNumberFormats);
        const format = await showQuickPick(
          `Choose the number format for the variable ${variable}`,
          numberFormats.map((p) => new LionizationPickItem(p))
        );
        if (format !== 'none') {
          placeholder = placeholder.addFormat(format);
          if (includeInSymbol(format)) {
            const symbol = await showInputBox(
              `Choose the symbol for the variable ${name}`,
              ''
            );
            placeholder = placeholder.addSymbol(symbol);
          }
          if (includeInDecimalDigits(format)) {
            const decimalDigits = await showInputBox(
              `Choose the decimal digits for the variable ${name}`,
              ''
            );
            placeholder = placeholder.addDecimalDigits(Number(decimalDigits));
          }
          if (includeInCustomPattern(format)) {
            const customPattern = await showInputBox(
              `Choose the custom pattern for the variable ${name}`,
              ''
            );
            placeholder = placeholder.addCustomPattern(customPattern);
          }
        }
      }
      placeholders.push(placeholder);
    }
  }

  return new EditFilesParameters(
    commandParameters.uri,
    commandParameters.range,
    new KeyValuePair(key, commandParameters.value),
    placeholders
  );
}
