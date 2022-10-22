import * as vscode from 'vscode';

export class ReplaceParameters {
  document: vscode.TextDocument;

  range: vscode.Range;

  value: string;

  constructor(
    document: vscode.TextDocument,
    range: vscode.Range,
    value: string
  ) {
    this.document = document;
    this.range = range;
    this.value = value;
  }
}
