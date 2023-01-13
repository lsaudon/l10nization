import * as vscode from 'vscode';
import { getArbFiles } from './getArbFiles';
import { getProjectName } from './getProjectName';
import { sortArb } from './sortArb';

export async function sortArbFiles(): Promise<vscode.WorkspaceEdit> {
  if (typeof vscode.window.activeTextEditor === 'undefined') {
    const errorMessage = `No current active editor.`;
    vscode.window.showErrorMessage(errorMessage);
    throw new Error(errorMessage);
  }
  const projectName = getProjectName(
    vscode.window.activeTextEditor.document.uri
  );
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

  (await Promise.all(openTextDocuments)).forEach((content, index) => {
    workspaceEdit.replace(
      files[index],
      new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
      ),
      JSON.stringify(
        Object.fromEntries(
          sortArb(
            new Map<string, unknown>(
              Object.entries<string>(JSON.parse(content.getText()) as string)
            )
          )
        ),
        null,
        2
      )
    );
  });

  return workspaceEdit;
}
