import * as vscode from 'vscode';

export function getProjectName(documentUri: vscode.Uri): string {
  return documentUri.path.split('/lib/')[0].split('/').pop() ?? '';
}
