import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { ReplaceParameters } from './replaceParameters';

const parentSection = 'l10nization';
const appLocalizationsVariableSection = 'appLocalizationsVariable';
const defaultVariable = 'l10n';

async function getArbFiles() {
  const l10nFiles = await vscode.workspace.findFiles(`**/l10n.yaml`);
  const first = 0;
  const l10nFile = l10nFiles[first];
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
  const files = await getArbFiles();
  const results: Thenable<vscode.TextDocument>[] = [];
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

  const appLocalizationsVariable =
    vscode.workspace
      .getConfiguration(parentSection)
      .get<string>(appLocalizationsVariableSection) ?? defaultVariable;

  workspaceEdit.replace(
    replaceParameters.documentUri,
    replaceParameters.range,
    `${appLocalizationsVariable}.${key}`
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
