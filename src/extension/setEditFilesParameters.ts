import { CommandParameters } from '../commands/commandParameters';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { KeyValuePair } from './keyValuePair';
import { Placeholder } from '../placeholders/placeholder';
import { camelize } from '../shared/camelize';
import { getVariablesInInterpolation } from '../shared/parser/parser';
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
      // eslint-disable-next-line no-await-in-loop
      const name = await showInputBox(
        `Enter the name of the variable ${variable}`,
        camelize(variable)
      );
      // eslint-disable-next-line no-await-in-loop
      const placeholderType = await showPlaceholderQuickPick(name);
      placeholders.push(new Placeholder(name, variable, placeholderType));
    }
  }

  return new EditFilesParameters(
    commandParameters.uri,
    commandParameters.range,
    new KeyValuePair(key, commandParameters.value),
    placeholders
  );
}
