import * as vscode from "vscode";
import { canExecuteCommand } from "../../core/commands/canExecuteCommand";

export async function runIfExist(flutterPackagesGetCommand: string): Promise<void> {
	const commands = await vscode.commands.getCommands();
	if (!canExecuteCommand(commands, flutterPackagesGetCommand)) {
		return;
	}
	await vscode.commands.executeCommand(flutterPackagesGetCommand);
}
