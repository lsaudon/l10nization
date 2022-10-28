import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { ReplaceParameters } from './replaceParameters';

const localizationClass = 'l10n';

async function getArbFiles(uri: vscode.Uri) {
  const l10nFile = vscode.Uri.parse(`${uri.toString()}/l10n.yaml`);
  const textDocument = await vscode.workspace.openTextDocument(l10nFile);
  const arbDir = yaml
    .parseDocument(textDocument.getText())
    .get('arb-dir') as string;
  return vscode.workspace.findFiles(`**/${arbDir}/*.arb`);
}

function toJson(
  content: vscode.TextDocument,
  key: string,
  value: string
): string {
  const map = new Map(
    Object.entries<string>(JSON.parse(content.getText()) as string)
  );
  map.set(key, value);
  return JSON.stringify(Object.fromEntries(map), null, 2);
}

async function getChangesForArbFiles(
  key: string,
  replaceParameters: ReplaceParameters
): Promise<vscode.WorkspaceEdit> {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(
    replaceParameters.documentUri
  );
  if (!workspaceFolder) {
    return new vscode.WorkspaceEdit();
  }

  const files = await getArbFiles(workspaceFolder.uri),
    results: Thenable<vscode.TextDocument>[] = [];
  files.forEach((file) => {
    results.push(vscode.workspace.openTextDocument(file));
  });
  const workspaceEdit = new vscode.WorkspaceEdit(),
    { value } = replaceParameters.keyValuePair;
  (await Promise.all(results)).forEach((content, index) => {
    workspaceEdit.replace(
      files[index],
      new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ),
      toJson(content, key, value)
    );
  });
  workspaceEdit.replace(
    replaceParameters.documentUri,
    replaceParameters.range,
    `${localizationClass}.${key}`
  );
  return workspaceEdit;
}

export function localizationInputBox(
  replaceParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = replaceParameters.keyValuePair.key;
  inputBox.onDidAccept(async () => {
    const edit = await getChangesForArbFiles(inputBox.value, replaceParameters);
    inputBox.hide();
    return vscode.workspace.applyEdit(edit);
  });
  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
