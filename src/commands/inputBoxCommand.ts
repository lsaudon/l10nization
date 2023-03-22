import * as vscode from 'vscode';
import { CommandParameters } from './commandParameters';

export class InputBoxCommand implements vscode.Command {
  public static readonly commandName = 'l10nization.inputBox';

  constructor(args: CommandParameters[]) {
    this.title = 'Extract to arb files';
    this.command = InputBoxCommand.commandName;
    this.arguments = args;
  }

  readonly title: string;

  readonly command: string;

  readonly tooltip?: string;

  readonly arguments?: CommandParameters[];
}
