import { describe, expect, it } from "vitest";
import { parseArbConfig } from "../../../core/arb/parseArbConfig";

describe("parseArbConfig", () => {
	it("reads the arb directory and template file name from l10n.yaml", () => {
		const result = parseArbConfig(`arb-dir: lib/l10n/arb\ntemplate-arb-file: app_fr.arb\n`);

		expect(result).toEqual({
			arbDir: "lib/l10n/arb",
			templateArbFileName: "app_fr.arb",
		});
	});

	it("falls back to the default template file when it is missing", () => {
		expect(parseArbConfig("arb-dir: lib/l10n/arb\n")).toEqual({
			arbDir: "lib/l10n/arb",
			templateArbFileName: "app_en.arb",
		});
	});
});
