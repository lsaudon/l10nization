import * as vscode from 'vscode';

export function getConfiguration(section: string): vscode.WorkspaceConfiguration {
  return vscode.workspace.getConfiguration(section);
}
