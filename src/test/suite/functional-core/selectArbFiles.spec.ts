import { describe, expect, it } from "vitest";
import { AddMessageInStatus } from "../../../core/arb/addMessageInStatus";
import { selectArbFiles } from "../../../core/arb/selectArbFiles";

describe("selectArbFiles", () => {
	it("returns all files when all mode is selected", () => {
		const result = selectArbFiles(
			[
				"/workspace/demo_app/lib/l10n/arb/app_en.arb",
				"/workspace/demo_app/lib/l10n/arb/app_fr.arb",
			],
			"app_en.arb",
			AddMessageInStatus.All,
		);

		expect(result.files).toEqual([
			"/workspace/demo_app/lib/l10n/arb/app_en.arb",
			"/workspace/demo_app/lib/l10n/arb/app_fr.arb",
		]);
		expect(result.templateFile).toBe("/workspace/demo_app/lib/l10n/arb/app_en.arb");
	});

	it("returns only the template file when template mode is selected", () => {
		const result = selectArbFiles(
			[
				"/workspace/demo_app/lib/l10n/arb/app_en.arb",
				"/workspace/demo_app/lib/l10n/arb/app_fr.arb",
			],
			"app_en.arb",
			AddMessageInStatus.Template,
		);

		expect(result.files).toEqual(["/workspace/demo_app/lib/l10n/arb/app_en.arb"]);
		expect(result.templateFile).toBe("/workspace/demo_app/lib/l10n/arb/app_en.arb");
	});

	it("returns an empty list when template mode is selected but template file is missing", () => {
		const result = selectArbFiles(
			["/workspace/demo_app/lib/l10n/arb/app_fr.arb"],
			"app_en.arb",
			AddMessageInStatus.Template,
		);

		expect(result.files).toEqual([]);
		expect(result.templateFile).toBeUndefined();
	});
});
