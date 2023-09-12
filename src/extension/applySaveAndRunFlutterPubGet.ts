import * as vscode from 'vscode';
import { EditFilesParameters } from '../commands/editFilesParameters';
import { getChangesForArbFiles } from './getChangesForArbFiles';
import { runGeneration } from './runFlutterPubGet';

export async function applySaveAndRunGeneration(editFilesParameters: EditFilesParameters): Promise<void> {
  const { workspace } = vscode;
  await workspace.applyEdit(await getChangesForArbFiles(editFilesParameters), {
    isRefactoring: true,
  });
  await workspace.saveAll();
  await runGeneration();
}
