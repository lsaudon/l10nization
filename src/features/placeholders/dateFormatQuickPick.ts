import * as vscode from "vscode";
import { LionizationPickItem } from "../../ui/quickPick/showQuickPick";
import { notInclude, validDateFormats } from "./dateFormat";

export async function showDateFormatQuickPick(variable: string): Promise<string> {
	const disposables: vscode.Disposable[] = [];
	try {
		return await new Promise<string>((resolve) => {
			const quickPick = vscode.window.createQuickPick();
			quickPick.title = `Choose the number format for the variable ${variable}`;
			quickPick.items = validDateFormats.map((s) => new LionizationPickItem(s));
			quickPick.onDidChangeValue(() => {
				if (notInclude(quickPick.value))
					quickPick.items = [quickPick.value, ...validDateFormats].map((label) => ({
						label,
					}));
			});
			disposables.push(
				quickPick.onDidChangeSelection((selected) => {
					quickPick.enabled = false;
					quickPick.busy = true;
					const item = selected[0];
					if (typeof item === "undefined") {
						quickPick.enabled = true;
						quickPick.busy = false;
						return;
					}
					resolve(item.label);
					quickPick.enabled = true;
					quickPick.busy = false;
					quickPick.hide();
				}),
			);
			quickPick.show();
		});
	} finally {
		disposables.forEach((d) => {
			d.dispose();
		});
	}
}
