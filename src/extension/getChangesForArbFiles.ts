import * as vscode from 'vscode';
import {
  appLocalizationsVariableSection,
  arbSortSection,
  defaultArbSort,
  defaultVariable,
  parentSection
} from '../shared/constants';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { getArbFiles } from './getArbFiles';
import { getConfiguration } from './getConfiguration';
import { getFunctionCall } from './getFunctionCall';
import { getProjectName } from './getProjectName';
import { toJson } from './toJson';

export async function getChangesForArbFiles(
  parameters: EditFilesParameters
): Promise<vscode.WorkspaceEdit> {
  const projectName = getProjectName(parameters.uri);
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
  const { key, value } = parameters.keyValue;
  const { description, placeholders } = parameters;
  const sortArbEnabled = getConfiguration(parentSection).get<boolean>(
    arbSortSection,
    defaultArbSort
  );

  (await Promise.all(openTextDocuments)).forEach((content, index) => {
    workspaceEdit.replace(
      files[index],
      new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ),
      toJson(
        content.getText(),
        key,
        description,
        value,
        placeholders,
        sortArbEnabled
      )
    );
  });

  const appLocalizationsVariable = getConfiguration(parentSection).get<string>(
    appLocalizationsVariableSection,
    defaultVariable
  );
  workspaceEdit.replace(
    parameters.uri,
    parameters.range,
    getFunctionCall(
      appLocalizationsVariable,
      key,
      placeholders.map((p) => p.value)
    )
  );
  return workspaceEdit;
}
