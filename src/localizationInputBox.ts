import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { ReplaceParameters } from './replaceParameters';

const localizationClass = 'l10n';

async function getArbFiles(workspaceFolder: vscode.WorkspaceFolder) {
  const { uri } = workspaceFolder;
  const l10nFile = vscode.Uri.parse(`${uri.toString()}/l10n.yaml`);
  const textDocument = await vscode.workspace.openTextDocument(l10nFile);
  const arbDir = yaml
    .parseDocument(textDocument.getText())
    .get('arb-dir') as string;
  const files = await vscode.workspace.findFiles(`**/${arbDir}/*.arb`);
  return files;
}

export function localizationInputBox(
  replaceParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = replaceParameters.value;
  inputBox.onDidAccept(async () => {
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.replace(
      replaceParameters.document.uri,
      replaceParameters.range,
      `${localizationClass}.${inputBox.value}`
    );
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(
      replaceParameters.document.uri
    );
    if (workspaceFolder) {
      const files = await getArbFiles(workspaceFolder);
      const results: Thenable<vscode.TextDocument>[] = [];
      files.forEach((file) => {
        results.push(vscode.workspace.openTextDocument(file));
      });
      const contents = await Promise.all(results);
      contents.forEach((content) => {
        const text = content.getText();
        const json = Object.entries(JSON.parse(text) as [string, unknown][]);
        console.log(json);
        // ajouter un élément dans la liste.
      });
      // workspaceEdit.replace(
      //   element,
      //   new vscode.Range(
      //     new vscode.Position(0, 0),
      //     new vscode.Position(0, 0)
      //   ),
      //   `${inputBox.value}`
      // );
    }

    inputBox.hide();
    return vscode.workspace.applyEdit(workspaceEdit);
  });
  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
