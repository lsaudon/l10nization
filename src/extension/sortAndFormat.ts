import * as vscode from 'vscode';
import { getSortedArb } from './getSortedArb';

export async function sortAndFormat(document: vscode.TextDocument, editor: vscode.TextEditor): Promise<void> {
  const { version } = document;
  const code = document.getText();

  try {
    const startPosition = new vscode.Position(0, 0);
    const endPosition = new vscode.Position(document.lineCount, 0);
    const replaceRange = new vscode.Range(startPosition, endPosition);

    const result = getSortedArb(code);

    if (code !== result && editor.document.version === version) {
      await editor.edit((edit) => edit.replace(replaceRange, result));
    }
  } catch (e) {
    console.log(e);
  }
}
