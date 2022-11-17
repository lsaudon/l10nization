import * as vscode from 'vscode';

export async function runIfExist(
  flutterPackagesGetCommand: string
): Promise<void> {
  const commands = await vscode.commands.getCommands();
  if (commands.some((command) => command === flutterPackagesGetCommand)) {
    await vscode.commands.executeCommand(flutterPackagesGetCommand);
  }
}
