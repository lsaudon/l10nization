import * as vscode from 'vscode';

export async function showInputBox(title: string, value: string): Promise<string> {
  const disposables: vscode.Disposable[] = [];
  try {
    return await new Promise<string>((resolve) => {
      const inputBox = vscode.window.createInputBox();
      inputBox.title = title;
      inputBox.value = value;
      disposables.push(
        inputBox.onDidAccept(() => {
          inputBox.enabled = false;
          inputBox.busy = true;
          resolve(inputBox.value);
          inputBox.enabled = true;
          inputBox.busy = false;
          inputBox.hide();
        }),
      );
      inputBox.show();
    });
  } finally {
    disposables.forEach((d) => {
      d.dispose();
    });
  }
}
