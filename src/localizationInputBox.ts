import * as vscode from 'vscode';
import { ReplaceParameters } from './replaceParameters';

const localizationClass = 'l10n';

export function localizationInputBox(
  workspaceEditParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = workspaceEditParameters.value;
  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.onDidAccept(() => {
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.replace(
      workspaceEditParameters.document.uri,
      workspaceEditParameters.range,
      `${localizationClass}.${inputBox.value}`
    );
    inputBox.hide();
    return vscode.workspace.applyEdit(workspaceEdit);
  });
  inputBox.onDidChangeValue((e) =>
    vscode.window.showInformationMessage(`onDidChangeValue: ${e}`)
  );
  inputBox.show();
}
