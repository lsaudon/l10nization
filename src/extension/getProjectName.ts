import * as vscode from 'vscode';
import { empty, first } from '../shared/constants';

export function getProjectName(documentUri: vscode.Uri): string {
  return documentUri.path.split('/lib/')[first].split('/').pop() ?? empty;
}
