import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { ReplaceParameters } from './replaceParameters';

const parentSection = 'l10nization';

const appLocalizationsVariableSection = 'appLocalizationsVariable';
const defaultVariable = 'l10n';

const flutterPubGetEnabledSection = 'flutterPubGetEnabled';
const defaultPubGet = true;

const first = 0;

async function getArbFiles(projectName: string) {
  const l10nFiles = await vscode.workspace.findFiles(
    `**/${projectName}/l10n.yaml`
  );
  const l10nFile = l10nFiles[first];
  const textDocument = await vscode.workspace.openTextDocument(l10nFile);
  const arbDir = yaml
    .parseDocument(textDocument.getText())
    .get('arb-dir') as string;
  return vscode.workspace.findFiles(`**/${projectName}/${arbDir}/*.arb`);
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

function getProjectName(documentUri: vscode.Uri): string {
  return documentUri.path.split('/lib/')[first].split('/').pop() ?? '';
}

async function getChangesForArbFiles(
  key: string,
  replaceParameters: ReplaceParameters
): Promise<vscode.WorkspaceEdit> {
  const projectName = getProjectName(replaceParameters.documentUri);
  const files = await getArbFiles(projectName);
  const openTextDocuments: Thenable<vscode.TextDocument>[] = [];
  files.forEach((file) => {
    openTextDocuments.push(vscode.workspace.openTextDocument(file));
  });
  const workspaceEdit = new vscode.WorkspaceEdit();
  const { value } = replaceParameters.keyValuePair;
  (await Promise.all(openTextDocuments)).forEach((content, index) => {
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

async function runIfExist(flutterPackagesGetCommand: string) {
  const commands = await vscode.commands.getCommands();
  if (commands.some((command) => command === flutterPackagesGetCommand)) {
    await vscode.commands.executeCommand(flutterPackagesGetCommand);
  }
}

export function localizationInputBox(
  replaceParameters: ReplaceParameters
): void {
  const inputBox = vscode.window.createInputBox();
  inputBox.value = replaceParameters.keyValuePair.key;
  inputBox.onDidAccept(async () => {
    inputBox.hide();
    const edit = await getChangesForArbFiles(inputBox.value, replaceParameters);
    await vscode.workspace.applyEdit(edit);
    await new Promise((f) => {
      setTimeout(f, 1000);
    });
    await vscode.workspace.saveAll(true);
    const flutterPubGetEnabled =
      vscode.workspace
        .getConfiguration(parentSection)
        .get<string>(flutterPubGetEnabledSection) ?? defaultPubGet;
    if (flutterPubGetEnabled) {
      await runIfExist('flutter.packages.get');
    }
    return vscode.Disposable;
  });

  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
