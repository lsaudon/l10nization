import { describe, expect, it } from "vitest";
import { shouldApplyArbFormat } from "../../../core/arb/shouldApplyArbFormat";

describe("shouldApplyArbFormat", () => {
	it("returns true when the text changed and the document version is still current", () => {
		expect(shouldApplyArbFormat('{"a":1}', '{\n"a": 1\n}', 1, 1)).toBe(true);
	});

	it("returns false when the text is unchanged", () => {
		expect(shouldApplyArbFormat('{\n"a": 1\n}', '{\n"a": 1\n}', 1, 1)).toBe(false);
	});

	it("returns false when the document version changed since read", () => {
		expect(shouldApplyArbFormat('{"a":1}', '{\n"a": 1\n}', 1, 2)).toBe(false);
	});
});
