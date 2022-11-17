import * as vscode from 'vscode';
import { CommandParameters } from '../commands/commandParameters';
import { InputBoxCommand } from '../commands/inputBoxCommand';
import { empty } from '../shared/constants';
import { getStringWithoutEscapes } from '../shared/parser/parser';

export class LocalizationActionProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    const text = getStringWithoutEscapes(document.getText(range));
    if (text === empty) {
      return;
    }

    return [
      this.createRefactorExtractToL10nFiles(
        new CommandParameters(document.uri, range, text)
      )
    ];
  }

  private createRefactorExtractToL10nFiles(
    commandParameters: CommandParameters
  ): vscode.CodeAction {
    const codeAction = new vscode.CodeAction(
      `Extract value to arb files`,
      vscode.CodeActionKind.RefactorExtract
    );
    codeAction.command = new InputBoxCommand([commandParameters]);
    return codeAction;
  }
}
