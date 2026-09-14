export type ParsedArbConfig = {
	arbDir: string;
	templateArbFileName: string;
};

export function parseArbConfig(yamlText: string): ParsedArbConfig {
	const lines = yamlText.split(/\r?\n/);
	let arbDir = "";
	let templateArbFileName = "app_en.arb";

	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.startsWith("arb-dir:")) {
			arbDir = trimmed.slice("arb-dir:".length).trim();
		}
		if (trimmed.startsWith("template-arb-file:")) {
			templateArbFileName = trimmed.slice("template-arb-file:".length).trim();
		}
	}

	if (arbDir.length === 0) {
		throw new Error("The arb-dir setting is missing from l10n.yaml.");
	}

	return { arbDir, templateArbFileName };
}
