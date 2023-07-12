import * as vscode from 'vscode';

export class LionizationPickItem implements vscode.QuickPickItem {
  constructor(readonly label: string) {
    // do nothing.
  }
}

export async function showQuickPick(
  title: string,
  items: LionizationPickItem[]
): Promise<string> {
  const disposables: vscode.Disposable[] = [];
  try {
    return await new Promise<string>((resolve) => {
      const quickPick = vscode.window.createQuickPick();
      quickPick.title = title;
      quickPick.items = items;
      disposables.push(
        quickPick.onDidChangeSelection((selected) => {
          quickPick.enabled = false;
          quickPick.busy = true;
          const item = selected[0];
          resolve(item.label);
          quickPick.enabled = true;
          quickPick.busy = false;
          quickPick.hide();
        })
      );
      quickPick.show();
    });
  } finally {
    disposables.forEach((d) => {
      d.dispose();
    });
  }
}
