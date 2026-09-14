export function canExecuteCommand(
	availableCommands: readonly string[],
	commandName: string,
): boolean {
	return availableCommands.includes(commandName);
}
