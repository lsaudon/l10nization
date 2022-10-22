import * as vscode from 'vscode';
import { ReplaceParameters } from './replaceParameters';

export class LocalizationCommand implements vscode.Command {
  public static readonly commandName = 'flutter-l10n.inputBox';

  constructor(args: ReplaceParameters[]) {
    this.title = 'extract for l10n';
    this.command = LocalizationCommand.commandName;
    this.arguments = args;
  }

  title: string;

  command: string;

  tooltip?: string;

  arguments?: ReplaceParameters[];
}
