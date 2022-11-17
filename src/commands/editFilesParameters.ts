import * as vscode from 'vscode';
import { KeyValuePair } from '../extension/keyValuePair';
import { Placeholder } from '../placeholders/placeholder';

export class EditFilesParameters {
  uri: vscode.Uri;

  range: vscode.Range;

  keyValue: KeyValuePair;

  placeholders: Placeholder[];

  constructor(
    uri: vscode.Uri,
    range: vscode.Range,
    keyValue: KeyValuePair,
    placeholders: Placeholder[]
  ) {
    this.uri = uri;
    this.range = range;
    this.keyValue = keyValue;
    this.placeholders = placeholders;
  }
}
