import type * as vscode from "vscode";
import type { Placeholder } from "../../core/arb/placeholder";
import type { KeyValuePair } from "../extension/keyValuePair";

export class EditFilesParameters {
	constructor(
		readonly uri: vscode.Uri,
		readonly range: vscode.Range,
		readonly keyValue: KeyValuePair,
		readonly description: string | null,
		readonly placeholders: Placeholder[],
	) {}
}
