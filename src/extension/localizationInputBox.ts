import * as vscode from 'vscode';
import { EditFilesCommand } from './editFilesCommand';
import { ReplaceParameters } from './replaceParameters';

export function localizationInputBox(
  replaceParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = replaceParameters.keyValuePair.key;
  inputBox.onDidAccept(async () => {
    inputBox.hide();
    replaceParameters.keyValuePair.key = inputBox.value;
    await vscode.commands.executeCommand(
      EditFilesCommand.commandName,
      replaceParameters
    );
    return vscode.Disposable;
  });
  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
