import * as vscode from 'vscode';
import { KeyValuePair } from './keyValuePair';

export class ReplaceParameters {
  documentUri: vscode.Uri;

  range: vscode.Range;

  keyValuePair: KeyValuePair;

  constructor(
    documentUri: vscode.Uri,
    range: vscode.Range,
    keyValuePair: KeyValuePair
  ) {
    this.documentUri = documentUri;
    this.range = range;
    this.keyValuePair = keyValuePair;
  }
}
