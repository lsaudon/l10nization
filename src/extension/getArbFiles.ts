import * as vscode from 'vscode';
import * as yaml from 'yaml';
import { AddMessageInStatus, Configuration } from '../shared/configuration';
import { resolvePath } from '../shared/resolvePath';

async function findYamlFiles(projectName: string, yamlFileName: string): Promise<vscode.Uri[]> {
  //ignore fvm directory because most of time , fvm creates its own l10n files
  const allYamlFiles = await vscode.workspace.findFiles(`**/${yamlFileName}`, '**/.fvm/**');
  const projectYaml = allYamlFiles.find((f) => f.fsPath.includes(projectName));
  return projectYaml ? [projectYaml] : allYamlFiles;
}

async function findFiles(include: string): Promise<vscode.Uri[]> {
  return await vscode.workspace.findFiles(resolvePath(include));
}

async function findArbFiles(projectName: string, arbDir: string): Promise<vscode.Uri[]> {
  const pattern1 = `**/${projectName}/${arbDir}/*.arb`;
  const arbFiles1 = await findFiles(pattern1);

  if (arbFiles1.length !== 0) {
    return arbFiles1;
  }

  const pattern2 = `**/${arbDir}/*.arb`;
  const arbFiles2 = await findFiles(pattern2);

  return arbFiles2;
}

export async function getArbFiles(projectName: string): Promise<[vscode.Uri[], vscode.Uri | undefined]> {
  const yamlFileName = Configuration.getInstance().getYamlFileName();
  const yamlFiles = await findYamlFiles(projectName, yamlFileName);

  if (yamlFiles.length === 0) {
    const errorMessage = `The ${yamlFileName} file was not found.`;
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }
  const yamlFile = yamlFiles[0];
  const textDocument = await vscode.workspace.openTextDocument(yamlFile);
  const parsedConfiguration = yaml.parseDocument(textDocument.getText());

  const arbDir = parsedConfiguration.get('arb-dir') as string;
  const arbFiles = await findArbFiles(projectName, arbDir);

  const templateArbFileName = (parsedConfiguration.get('template-arb-file') as string | undefined) ?? 'app_en.arb';
  const templateArbFile = arbFiles.find((arbFile) => arbFile.path.endsWith(templateArbFileName));
  const addMessageInStatus = Configuration.getInstance().getAddNewMessagesIn();
  switch (addMessageInStatus) {
    case AddMessageInStatus.All:
      return [arbFiles, templateArbFile];
    case AddMessageInStatus.Template: {
      if (typeof templateArbFile === 'undefined') {
        const errorMessage = `template-arb-file not found.`;
        vscode.window.showErrorMessage(errorMessage);
        throw new Error(errorMessage);
      }
      return [[templateArbFile], templateArbFile];
    }
    default: {
      const errorMessage = `This AddMessageInStatus is unknown.`;
      vscode.window.showErrorMessage(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
