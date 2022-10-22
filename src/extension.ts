import * as vscode from 'vscode';
import { LocalizationActionProvider } from './localizationActionProvider';
import { LocalizationCommand } from './localizationCommand';
import { ReplaceParameters } from './replaceParameters';
import { localizationInputBox } from './localizationInputBox';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      'dart',
      new LocalizationActionProvider(),
      {
        providedCodeActionKinds:
          LocalizationActionProvider.providedCodeActionKinds
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      LocalizationCommand.commandName,
      (...args: ReplaceParameters[]): void => {
        localizationInputBox(args[0]);
      }
    )
  );
}

export function deactivate(): void {
  // Do nothing.
}
