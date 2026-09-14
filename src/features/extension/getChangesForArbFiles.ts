import * as vscode from "vscode";
import { buildFunctionCall } from "../../core/arb/buildFunctionCall";
import { L10nObject } from "../../core/arb/l10nObject";
import { Configuration } from "../../infrastructure/shared/configuration";
import { toJson } from "../application/arb/arbSerializer";
import type { EditFilesParameters } from "../commands/editFilesParameters";
import { getArbFiles } from "./getArbFiles";
import { getProjectName } from "./getProjectName";

export async function getChangesForArbFiles(
	parameters: EditFilesParameters,
): Promise<vscode.WorkspaceEdit> {
	const projectName = getProjectName(parameters.uri);
	const [files, templateFile] = await getArbFiles(projectName);
	if (files.length === 0) {
		const errorMessage = `No ARB files were found for project "${projectName}". Check the project folder and the l10n configuration.`;
		vscode.window.showErrorMessage(errorMessage);
		throw new Error(errorMessage);
	}
	if (!templateFile) {
		const errorMessage = `No template ARB file was found for project "${projectName}". Check the "template-arb-file" setting in l10n.yaml.`;
		vscode.window.showErrorMessage(errorMessage);
		throw new Error(errorMessage);
	}
	const openTextDocuments: Thenable<vscode.TextDocument>[] = [];
	files.forEach((file) => {
		openTextDocuments.push(vscode.workspace.openTextDocument(file));
	});
	const workspaceEdit = new vscode.WorkspaceEdit();
	const { key, value } = parameters.keyValue;
	const { description, placeholders } = parameters;
	const sortArbEnabled = Configuration.getInstance().getSortArbEnabled();
	(await Promise.all(openTextDocuments)).forEach((content, index) => {
		const file = files[index];
		if (typeof file === "undefined") {
			return;
		}
		const isMetadataEnabled = Configuration.getInstance().getCopyMetadataInAllFiles();
		workspaceEdit.replace(
			file,
			new vscode.Range(
				new vscode.Position(0, 0),
				new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
			),
			toJson(
				content.getText(),
				new L10nObject(
					isMetadataEnabled || file === templateFile,
					key,
					description,
					value,
					placeholders,
				),
				sortArbEnabled,
			),
		);
	});

	const appLocalizationsVariable = Configuration.getInstance().getAppLocalizationsVariable();
	workspaceEdit.replace(
		parameters.uri,
		parameters.range,
		buildFunctionCall(
			appLocalizationsVariable,
			key,
			placeholders.map((p) => p.value),
		),
	);
	return workspaceEdit;
}
