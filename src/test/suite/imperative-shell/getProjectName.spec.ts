import { describe, expect, it } from "vitest";
import { getProjectNameFromPath } from "../../../core/project/getProjectName";
import { getProjectName } from "../../../features/extension/getProjectName";

describe("getProjectNameFromPath", () => {
	it("returns the project name before the lib directory", () => {
		expect(getProjectNameFromPath("/workspace/my_app/lib/main.dart")).toBe("my_app");
		expect(getProjectNameFromPath("/workspace/other_app/lib/l10n/app_en.arb")).toBe("other_app");
	});

	it("keeps the compatibility shell adapter behavior", () => {
		const uri = { path: "/workspace/my_app/lib/main.dart" } as { path: string };
		expect(getProjectName(uri as never)).toBe("my_app");
	});
});
