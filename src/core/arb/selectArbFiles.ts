import { AddMessageInStatus } from "./addMessageInStatus";

type SelectArbFilesResult =
	| { files: string[]; templateFile: string }
	| { files: string[]; templateFile?: undefined };

export function selectArbFiles(
	arbFilePaths: readonly string[],
	templateArbFileName: string,
	addMessageInStatus: AddMessageInStatus,
): SelectArbFilesResult {
	const templateFile = arbFilePaths.find((filePath) => filePath.endsWith(templateArbFileName));

	switch (addMessageInStatus) {
		case AddMessageInStatus.All:
			return {
				files: [...arbFilePaths],
				templateFile: templateFile ?? undefined,
			};
		case AddMessageInStatus.Template:
			if (typeof templateFile === "undefined") {
				return { files: [] };
			}
			return {
				files: [templateFile],
				templateFile,
			};
		default:
			return {
				files: [...arbFilePaths],
				templateFile: templateFile ?? undefined,
			};
	}
}
