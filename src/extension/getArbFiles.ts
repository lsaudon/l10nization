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
