import type * as vscode from "vscode";
import { getProjectNameFromPath } from "../../core/project/getProjectName";

export function getProjectName(documentUri: vscode.Uri): string {
	return getProjectNameFromPath(documentUri.path);
}
