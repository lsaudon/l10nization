import * as vscode from 'vscode';
import { ReplaceParameters } from './replaceParameters';

const localizationClass = 'l10n';

export function localizationInputBox(
  replaceParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = replaceParameters.value;
  inputBox.onDidAccept(() => {
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.replace(
      replaceParameters.document.uri,
      replaceParameters.range,
      `${localizationClass}.${inputBox.value}`
    );
    workspaceEdit.replace(
      vscode.Uri.parse(
        replaceParameters.document.uri
          .toString()
          .replace('main.dart', 'l10n/arb/app_en.arb')
      ),
      new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)),
      `${localizationClass}.${inputBox.value}`
    );
    inputBox.hide();
    return vscode.workspace.applyEdit(workspaceEdit);
  });
  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
