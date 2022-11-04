import * as vscode from 'vscode';
import { KeyValuePair } from './keyValuePair';
import { LocalizationCommand } from './localizationCommand';
import { ReplaceParameters } from './replaceParameters';

const empty = '',
  quotes = ['"', "'"];

export class LocalizationActionProvider implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix
  ];

  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    const text = this.retrieveTextToBeLocalized(document, range);
    if (text === empty) {
      return;
    }

    return [this.createRefactorExtractToL10nFiles(document, range, text)];
  }

  private retrieveTextToBeLocalized(
    document: vscode.TextDocument,
    range: vscode.Range
  ): string {
    const { start, end } = range;
    const startCharacter = start.character;
    const endCharacter = end.character - 1;
    const { text } = document.lineAt(start.line);
    if (this.isNotString(text, startCharacter, endCharacter)) {
      return empty;
    }
    return text.substring(startCharacter + 1, endCharacter);
  }

  private createRefactorExtractToL10nFiles(
    document: vscode.TextDocument,
    range: vscode.Range,
    value: string
  ): vscode.CodeAction {
    const codeAction = new vscode.CodeAction(
      `Extract value to arb files`,
      vscode.CodeActionKind.RefactorExtract
    );
    codeAction.command = new LocalizationCommand([
      new ReplaceParameters(
        document.uri,
        range,
        new KeyValuePair(this.camelize(value), value)
      )
    ]);
    return codeAction;
  }

  private isNotString(
    text: string,
    startCharacter: number,
    endCharacter: number
  ): boolean {
    return !this.isString(text, startCharacter, endCharacter);
  }

  private isString(
    text: string,
    startCharacter: number,
    endCharacter: number
  ): boolean {
    return (
      quotes.includes(text[startCharacter]) &&
      quotes.includes(text[endCharacter])
    );
  }

  private camelize(value: string): string {
    const valueSplitted = value.split(/[^a-zA-Z0-9]/u);
    let result = '';
    for (let index = 0; index < valueSplitted.length; index += 1) {
      let element = valueSplitted[index];
      element = element.toLowerCase();
      if (index !== 0) {
        element = element.charAt(0).toUpperCase() + element.substring(1);
      }
      result += element;
    }
    return result;
  }
}
