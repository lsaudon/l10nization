import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { ReplaceParameters } from './replaceParameters';
import { empty } from './empty';

const parentSection = 'l10nization';

const appLocalizationsVariableSection = 'appLocalizationsVariable';
const defaultVariable = 'l10n';

const yamlFileSection = 'yamlFile';
const defaultYamlFile = 'l10n.yaml';

const flutterPubGetEnabledSection = 'flutterPubGetEnabled';
const defaultPubGet = true;

const first = 0;

async function getArbFiles(projectName: string): Promise<vscode.Uri[]> {
  const yamlFileName = vscode.workspace
    .getConfiguration(parentSection)
    .get<string>(yamlFileSection, defaultYamlFile);

  const yamlFiles = await vscode.workspace.findFiles(
    `**/${projectName}/${yamlFileName}`
  );

  if (yamlFiles.length === 0) {
    vscode.window.showErrorMessage(`The ${yamlFileName} file was not found.`);
    throw new Error(`The ${yamlFileName} file was not found.`);
  }

  const yamlFile = yamlFiles[first];
  const textDocument = await vscode.workspace.openTextDocument(yamlFile);
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
  return documentUri.path.split('/lib/')[first].split('/').pop() ?? empty;
}

async function getChangesForArbFiles(
  key: string,
  replaceParameters: ReplaceParameters
): Promise<vscode.WorkspaceEdit> {
  const projectName = getProjectName(replaceParameters.documentUri);
  const files = await getArbFiles(projectName);
  if (files.length === 0) {
    vscode.window.showErrorMessage(`No arb files found.`);
    throw new Error(`No arb files found.`);
  }
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

  const appLocalizationsVariable = vscode.workspace
    .getConfiguration(parentSection)
    .get<string>(appLocalizationsVariableSection, defaultVariable);

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
    await vscode.workspace.applyEdit(edit, { isRefactoring: true });
    await vscode.workspace.saveAll();
    const flutterPubGetEnabled = vscode.workspace
      .getConfiguration(parentSection)
      .get<boolean>(flutterPubGetEnabledSection, defaultPubGet);
    if (flutterPubGetEnabled) {
      await runIfExist('flutter.packages.get');
    }
    return vscode.Disposable;
  });

  inputBox.onDidHide(() => inputBox.dispose());
  inputBox.show();
}
