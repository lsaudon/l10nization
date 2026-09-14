import * as vscode from "vscode";
import { toJson } from "../application/arb/arbSerializer";
import { getArbFiles } from "./getArbFiles";
import { getProjectName } from "./getProjectName";

export async function sortArbFiles(): Promise<vscode.WorkspaceEdit> {
	const { activeTextEditor } = vscode.window;

	if (typeof activeTextEditor === "undefined") {
		const errorMessage = "No current active editor.";
		vscode.window.showErrorMessage(errorMessage);
		throw new Error(errorMessage);
	}

	const projectName = getProjectName(activeTextEditor.document.uri);
	const files = (await getArbFiles(projectName))[0];
	if (files.length === 0) {
		const errorMessage = `No ARB files were found for project "${projectName}". Check the project folder and the l10n configuration.`;
		vscode.window.showErrorMessage(errorMessage);
		throw new Error(errorMessage);
	}

	const textEdits = (
		await Promise.all(
			files.map((f) => vscode.workspace.openTextDocument(f).then((document) => document.getText())),
		)
	).map((text) =>
		vscode.TextEdit.replace(
			new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
			),
			toJson(text, null, true),
		),
	);

	const workspaceEdit = new vscode.WorkspaceEdit();
	textEdits.forEach((edit, index) => {
		const file = files[index];
		if (typeof file !== "undefined") {
			workspaceEdit.set(file, [edit]);
		}
	});

	return workspaceEdit;
}
