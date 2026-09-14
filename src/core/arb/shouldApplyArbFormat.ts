export function shouldApplyArbFormat(
	currentText: string,
	formattedText: string,
	initialDocumentVersion: number,
	currentDocumentVersion: number,
): boolean {
	return currentText !== formattedText && currentDocumentVersion === initialDocumentVersion;
}
