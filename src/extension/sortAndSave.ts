import * as vscode from 'vscode';
import { sortArbFiles } from './sortArbFiles';

export async function sortAndSave(): Promise<void> {
  const { workspace } = vscode;
  await workspace.applyEdit(await sortArbFiles(), {
    isRefactoring: true
  });
  await workspace.saveAll();
}
