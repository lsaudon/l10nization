import { CommandParameters } from '../commands/commandParameters';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { KeyValuePair } from './keyValuePair';
import { NumberFormat } from '../placeholders/numberFormat';
import { Placeholder } from '../placeholders/placeholder';
import { PlaceholderType } from '../placeholders/placeholderType';
import { camelize } from '../shared/camelize';
import { getVariablesInInterpolation } from '../shared/parser/parser';
import { showInputBox } from '../inputBox/showInputBox';
import { showNumberFormatQuickPick } from '../placeholders/numberFormatQuickPick';
import { showPlaceholderFormatInputBox } from '../placeholders/placeholderFormatInputBox';
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
      // eslint-disable-next-line no-await-in-loop
      const name = await showInputBox(
        `Enter the name of the variable ${variable}`,
        camelize(variable)
      );
      // eslint-disable-next-line no-await-in-loop
      const placeholderType = await showPlaceholderQuickPick(name);
      if (placeholderType === PlaceholderType.DateTime) {
        // eslint-disable-next-line no-await-in-loop
        const format = await showPlaceholderFormatInputBox(name);
        placeholders.push(
          new Placeholder(name, variable, placeholderType, format)
        );
      } else if (placeholderType === PlaceholderType.int) {
        // eslint-disable-next-line no-await-in-loop
        const format = await showNumberFormatQuickPick(name);
        if (format === NumberFormat.none) {
          placeholders.push(new Placeholder(name, variable, placeholderType));
        } else {
          placeholders.push(
            new Placeholder(name, variable, placeholderType, format)
          );
        }
      } else {
        placeholders.push(new Placeholder(name, variable, placeholderType));
      }
    }
  }

  return new EditFilesParameters(
    commandParameters.uri,
    commandParameters.range,
    new KeyValuePair(key, commandParameters.value),
    placeholders
  );
}
