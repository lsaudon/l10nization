import * as vscode from 'vscode';
import { EditFilesParameters } from './editFilesParameters';

export class EditFilesCommand implements vscode.Command {
  public static readonly commandName = 'l10nization.editFiles';

  constructor(args: EditFilesParameters[]) {
    this.title = 'Edit files';
    this.command = EditFilesCommand.commandName;
    this.arguments = args;
  }

  readonly title: string;

  readonly command: string;

  readonly tooltip?: string;

  readonly arguments?: EditFilesParameters[];
}
