import * as vscode from 'vscode';
export class CommandParameters {
  constructor(
    readonly uri: vscode.Uri,
    readonly range: vscode.Range,
    readonly value: string,
  ) {
    // do nothing.
  }
}
