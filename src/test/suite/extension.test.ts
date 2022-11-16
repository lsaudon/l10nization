import * as assert from 'assert';
import * as vscode from 'vscode';
import {
  executeCodeActionProvider,
  getMyAppMainFile,
  stubCreateInputBox
} from '../helpers';
import { ReplaceParameters } from '../../extension/replaceParameters';
import { extensionIdentifier } from '../../shared/constants';

suite('L10nisation Test Suite', () => {
  test('Should show `Extract value to arb files` in CodeAction When Range on string', async () => {
    const extension = vscode.extensions.getExtension(extensionIdentifier);
    if (!extension) {
      throw new Error('');
    }
    await extension.activate();
    const document = await vscode.workspace.openTextDocument(
      getMyAppMainFile()
    );
    await vscode.window.showTextDocument(document);
    const actions = await vscode.commands.executeCommand<vscode.CodeAction[]>(
      'vscode.executeCodeActionProvider',
      document.uri,
      new vscode.Range(new vscode.Position(21, 17), new vscode.Position(21, 20))
    );
    assert(actions[0].title, 'Extract value to arb file');
  });

  test('Should When select `Extract value to arb files` in CodeAction', async () => {
    const inputBox = stubCreateInputBox('aB');
    assert.notEqual(inputBox.value, 'aB');

    const extension = vscode.extensions.getExtension(extensionIdentifier);
    if (!extension) {
      throw new Error('');
    }
    await extension.activate();
    const document = await vscode.workspace.openTextDocument(
      getMyAppMainFile()
    );
    const actions = await vscode.commands.executeCommand<vscode.CodeAction[]>(
      executeCodeActionProvider,
      document.uri,
      new vscode.Range(new vscode.Position(21, 17), new vscode.Position(21, 20))
    );
    const { command } = actions[0];
    if (!command?.arguments) {
      throw new Error('');
    }
    await vscode.commands.executeCommand(
      command.command,
      ...(command.arguments as ReplaceParameters[])
    );

    assert.equal(inputBox.value, 'aB');
  });
});
