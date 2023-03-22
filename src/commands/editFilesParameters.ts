import * as vscode from 'vscode';
import { KeyValuePair } from '../extension/keyValuePair';
import { Placeholder } from '../placeholders/placeholder';

export class EditFilesParameters {
  constructor(
    readonly uri: vscode.Uri,
    readonly range: vscode.Range,
    readonly keyValue: KeyValuePair,
    readonly placeholders: Placeholder[]
  ) {}
}
