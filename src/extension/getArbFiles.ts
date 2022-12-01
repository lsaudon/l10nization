import * as vscode from 'vscode';
import * as yaml from 'yaml';
import {
  defaultYamlFile,
  first,
  parentSection,
  yamlFileSection
} from '../shared/constants';
import { getConfiguration } from './getConfiguration';

export async function getArbFiles(projectName: string): Promise<vscode.Uri[]> {
  const yamlFileName = getConfiguration(parentSection).get<string>(
    yamlFileSection,
    defaultYamlFile
  );

  let yamlFiles = await vscode.workspace.findFiles(
    `**/${projectName}/${yamlFileName}`
  );
  if (yamlFiles.length === 0) {
    yamlFiles = await vscode.workspace.findFiles(`**/${yamlFileName}`);
  }

  if (yamlFiles.length === 0) {
    const errorMessage = `The ${yamlFileName} file was not found.`;
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }
  const yamlFile = yamlFiles[first];
  const textDocument = await vscode.workspace.openTextDocument(yamlFile);
  const arbDir = yaml
    .parseDocument(textDocument.getText())
    .get('arb-dir') as string;
  let arbFiles = await vscode.workspace.findFiles(
    `**/${projectName}/${arbDir}/*.arb`
  );
  if (arbFiles.length === 0) {
    arbFiles = await vscode.workspace.findFiles(`**/${arbDir}/*.arb`);
  }
  return arbFiles;
}
