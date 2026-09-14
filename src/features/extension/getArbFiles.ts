import * as vscode from "vscode";
import { AddMessageInStatus } from "../../core/arb/addMessageInStatus";
import { parseArbConfig } from "../../core/arb/parseArbConfig";
import { selectArbFiles } from "../../core/arb/selectArbFiles";
import { resolvePath } from "../../core/shared/resolvePath";
import { Configuration } from "../../infrastructure/shared/configuration";

function throwMissingArbConfigurationError(message: string): never {
	vscode.window.showErrorMessage(message);
	throw new Error(message);
}

async function findYamlFiles(projectName: string, yamlFileName: string): Promise<vscode.Uri[]> {
	const excludeGlobs = "{**/.fvm/**,**/.dart_tool/**,**/build/**}";
	const yamlFiles = await vscode.workspace.findFiles(
		`**/${projectName}/${yamlFileName}`,
		excludeGlobs,
	);
	if (yamlFiles.length !== 0) {
		return yamlFiles;
	}
	return await vscode.workspace.findFiles(`**/${yamlFileName}`, excludeGlobs);
}

async function findFiles(include: string): Promise<vscode.Uri[]> {
	return await vscode.workspace.findFiles(resolvePath(include));
}

async function findArbFiles(projectName: string, arbDir: string): Promise<vscode.Uri[]> {
	const pattern1 = `**/${projectName}/${arbDir}/*.arb`;
	const arbFiles1 = await findFiles(pattern1);
	if (arbFiles1.length !== 0) {
		return arbFiles1;
	}

	const pattern2 = `**/${arbDir}/*.arb`;
	return await findFiles(pattern2);
}

export async function getArbFiles(
	projectName: string,
): Promise<[vscode.Uri[], vscode.Uri | undefined]> {
	Configuration.getInstance().reload();
	const yamlFileName = Configuration.getInstance().getYamlFileName();
	const yamlFiles = await findYamlFiles(projectName, yamlFileName);

	if (yamlFiles.length === 0) {
		const errorMessage = `The ${yamlFileName} file was not found for project "${projectName}". Make sure the Flutter project contains a valid l10n configuration.`;
		throwMissingArbConfigurationError(errorMessage);
	}
	const yamlFile = yamlFiles[0];
	if (typeof yamlFile === "undefined") {
		const errorMessage = `The ${yamlFileName} file was not found for project "${projectName}". Make sure the Flutter project contains a valid l10n configuration.`;
		throwMissingArbConfigurationError(errorMessage);
	}
	const textDocument = await vscode.workspace.openTextDocument(yamlFile);
	const { arbDir, templateArbFileName } = parseArbConfig(textDocument.getText());
	const arbFiles = await findArbFiles(projectName, arbDir);
	const addMessageInStatus = Configuration.getInstance().getAddNewMessagesIn();
	const selectedArbFiles = selectArbFiles(
		arbFiles.map((arbFile) => arbFile.path),
		templateArbFileName,
		addMessageInStatus,
	);

	const selectedFileList = arbFiles.filter((arbFile) =>
		selectedArbFiles.files.includes(arbFile.path),
	);
	const templateArbFile = selectedArbFiles.templateFile
		? arbFiles.find((arbFile) => arbFile.path === selectedArbFiles.templateFile)
		: undefined;

	if (
		addMessageInStatus === AddMessageInStatus.Template &&
		typeof templateArbFile === "undefined"
	) {
		const errorMessage = `No template ARB file was found for project "${projectName}". Check the "template-arb-file" setting in ${yamlFileName}.`;
		throwMissingArbConfigurationError(errorMessage);
	}

	return [selectedFileList, templateArbFile];
}
