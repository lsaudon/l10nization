import * as vscode from 'vscode';
import { Configuration } from '../shared/configuration';
import { runGeneration } from './runGeneration';
import { toJson } from './toJson';

export async function sortAndFormat(document: vscode.TextDocument, editor: vscode.TextEditor): Promise<void> {
  const { version } = document;
  const text = document.getText();
  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(document.lineCount, 0);
  const replaceRange = new vscode.Range(startPosition, endPosition);

  const sortArbEnabled = Configuration.getInstance().getSortArbEnabled();
  const result = toJson(text, null, sortArbEnabled);

  if (text !== result && editor.document.version === version) {
    await editor.edit((edit) => edit.replace(replaceRange, result));

    await runGeneration();
  }
}
