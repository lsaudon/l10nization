import * as vscode from 'vscode';
import { getArbFiles } from './getArbFiles';
import { getProjectName } from './getProjectName';
import { sortArb } from './sortArb';

export async function sortArbFiles(): Promise<vscode.WorkspaceEdit> {
  const { activeTextEditor } = vscode.window;

  if (typeof activeTextEditor === 'undefined') {
    const errorMessage = 'No current active editor.';
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }

  const projectName = getProjectName(activeTextEditor.document.uri);
  const files = (await getArbFiles(projectName))[0];
  if (files.length === 0) {
    const errorMessage = 'No arb files found.';
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }

  const textEdits = (await Promise.all(files.map((f) => vscode.workspace.openTextDocument(f).then((document) => document.getText())))).map((text) =>
    vscode.TextEdit.replace(
      new vscode.Range(new vscode.Position(0, 0), new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)),
      JSON.stringify(Object.fromEntries(sortArb(new Map<string, unknown>(Object.entries<string>(JSON.parse(text) as string))))),
    ),
  );

  const workspaceEdit = new vscode.WorkspaceEdit();
  textEdits.forEach((edit, index) => {
    workspaceEdit.set(files[index], [edit]);
  });

  return workspaceEdit;
}
