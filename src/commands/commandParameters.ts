import * as vscode from 'vscode';
export class CommandParameters {
  uri: vscode.Uri;

  range: vscode.Range;

  value: string;

  constructor(uri: vscode.Uri, range: vscode.Range, value: string) {
    this.uri = uri;
    this.range = range;
    this.value = value;
  }
}
