import * as vscode from 'vscode';
import { sortArbFiles } from './sortArbFiles';

export async function sortAndSave(): Promise<void> {
  const edit = await sortArbFiles();
  await vscode.workspace.applyEdit(edit, { isRefactoring: true });
  await vscode.workspace.saveAll();
}
