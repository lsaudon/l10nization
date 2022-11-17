import * as vscode from 'vscode';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { getChangesForArbFiles } from './getChangesForArbFiles';
import { runFlutterPubGet } from './runFlutterPubGet';

export async function applySaveAndRunFlutterPubGet(
  editFilesParameters: EditFilesParameters
): Promise<void> {
  const edit = await getChangesForArbFiles(editFilesParameters);
  await vscode.workspace.applyEdit(edit, { isRefactoring: true });
  await vscode.workspace.saveAll();
  await runFlutterPubGet();
}
