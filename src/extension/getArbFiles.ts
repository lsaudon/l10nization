import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { getYamlFileName } from '../shared/configuration';

export async function getArbFiles(projectName: string): Promise<[vscode.Uri[], vscode.Uri | undefined]> {
  const yamlFileName = getYamlFileName;

  let yamlFiles = await vscode.workspace.findFiles(`**/${projectName}/${yamlFileName}`);
  if (yamlFiles.length === 0) {
    yamlFiles = await vscode.workspace.findFiles(`**/${yamlFileName}`);
  }

  if (yamlFiles.length === 0) {
    const errorMessage = `The ${yamlFileName} file was not found.`;
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }
  const yamlFile = yamlFiles[0];
  const textDocument = await vscode.workspace.openTextDocument(yamlFile);
  const parsedConfiguration = yaml.parseDocument(textDocument.getText());
  const arbDir = parsedConfiguration.get('arb-dir') as string;
  const templateArbFileName = (parsedConfiguration.get('template-arb-file') as string | undefined) ?? 'app_en.arb';

  let arbFiles = await vscode.workspace.findFiles(`**/${projectName}/${arbDir}/*.arb`);
  if (arbFiles.length === 0) {
    arbFiles = await vscode.workspace.findFiles(`**/${arbDir}/*.arb`);
  }

  const templateArbFile = arbFiles.find((arbFile) => arbFile.path.endsWith(templateArbFileName));

  return [arbFiles, templateArbFile];
}
