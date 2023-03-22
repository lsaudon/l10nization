import * as vscode from 'vscode';

export async function runIfExist(
  flutterPackagesGetCommand: string
): Promise<void> {
  const commands = await vscode.commands.getCommands();
  if (!commands.includes(flutterPackagesGetCommand)) {
    return;
  }
  await vscode.commands.executeCommand(flutterPackagesGetCommand);
}
