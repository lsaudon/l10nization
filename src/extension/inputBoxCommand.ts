import * as vscode from 'vscode';
import { ReplaceParameters } from './replaceParameters';

export class InputBoxCommand implements vscode.Command {
  public static readonly commandName = 'l10nization.inputBox';

  constructor(args: ReplaceParameters[]) {
    this.title = 'Extract to arb files';
    this.command = InputBoxCommand.commandName;
    this.arguments = args;
  }

  title: string;

  command: string;

  tooltip?: string;

  arguments?: ReplaceParameters[];
}
