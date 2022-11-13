import * as vscode from 'vscode';
import { ReplaceParameters } from './replaceParameters';

export class EditFilesCommand implements vscode.Command {
  public static readonly commandName = 'l10nization.editFiles';

  constructor(args: ReplaceParameters[]) {
    this.title = 'Edit files';
    this.command = EditFilesCommand.commandName;
    this.arguments = args;
  }

  title: string;

  command: string;

  tooltip?: string;

  arguments?: ReplaceParameters[];
}
