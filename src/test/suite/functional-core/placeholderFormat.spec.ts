import { describe, expect, it } from "vitest";
import { notInclude, validDateFormats } from "../../../core/placeholders/dateFormat";
import {
	includeInCustomPattern,
	includeInDecimalDigits,
	includeInSymbol,
	validNumberFormats,
} from "../../../core/placeholders/numberFormat";

describe("placeholder format predicates", () => {
	it("keeps date format validation in the core layer", () => {
		expect(validDateFormats.includes("yMd")).toBe(true);
		expect(notInclude("not-a-format")).toBe(true);
		expect(notInclude("yMd")).toBe(false);
	});

	it("keeps number format validation in the core layer", () => {
		expect(validNumberFormats.includes("currency")).toBe(true);
		expect(includeInSymbol("currency")).toBe(true);
		expect(includeInDecimalDigits("currency")).toBe(true);
		expect(includeInCustomPattern("currency")).toBe(true);
	});
});
