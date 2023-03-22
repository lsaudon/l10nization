import * as vscode from 'vscode';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { getChangesForArbFiles } from './getChangesForArbFiles';
import { runFlutterPubGet } from './runFlutterPubGet';

export async function applySaveAndRunFlutterPubGet(
  editFilesParameters: EditFilesParameters
): Promise<void> {
  const { workspace } = vscode;
  await workspace.applyEdit(await getChangesForArbFiles(editFilesParameters), {
    isRefactoring: true
  });
  await workspace.saveAll();
  await runFlutterPubGet();
}
