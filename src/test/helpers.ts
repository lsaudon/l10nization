import * as sinon from 'sinon';
import * as vscode from 'vscode';

export const executeCodeActionProvider = 'vscode.executeCodeActionProvider';

export function getWorkspaceFolder(): string {
  return __dirname.replace('\\out\\test', '');
}

export function getMyAppMainFile(): vscode.Uri {
  return vscode.Uri.file(
    `${getWorkspaceFolder()}/src/test/test_projects/my_app/lib/main.dart`
  );
}

export class InputBoxResult {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export function stubCreateInputBox(valueToReturn: string): InputBoxResult {
  const sb = sinon.createSandbox();
  const createInputBox = sb.stub(vscode.window, 'createInputBox');
  const result = new InputBoxResult('');
  createInputBox.callsFake(function (this: vscode.InputBox, ...args) {
    const input = (createInputBox as any).wrappedMethod.apply(this, args);
    let acceptCallback: () => void = () => null;
    sb.stub(input, 'onDidAccept').callsFake(
      (func) => (acceptCallback = func as () => void)
    );
    sb.stub(input, 'show').callsFake(() => {
      input.value = valueToReturn;
      result.value = input.value;
      setImmediate(() => acceptCallback());
    });
    return input as vscode.InputBox;
  });
  return result;
}
/* eslint-enable func-names */
/* eslint-enable no-invalid-this */
/* eslint-enable @typescript-eslint/no-explicit-any */
/* eslint-enable @typescript-eslint/no-unsafe-call */
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
