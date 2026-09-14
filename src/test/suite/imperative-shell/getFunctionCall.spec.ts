import { describe, expect, it } from "vitest";
import { buildFunctionCall } from "../../../core/arb/buildFunctionCall";
import { getFunctionCall } from "../../../features/extension/getFunctionCall";

describe("toJson", () => {
	it("should return l10n call when messages with no variable", () => {
		expect(buildFunctionCall("l10n", "hello", [])).to.be.equal("l10n.hello");
		expect(getFunctionCall("l10n", "hello", [])).to.be.equal("l10n.hello");
	});
	it("should return l10n call when messages with 1 variable", () => {
		expect(buildFunctionCall("l10n", "hello", ["name"])).to.be.equal("l10n.hello(name)");
		expect(getFunctionCall("l10n", "hello", ["name"])).to.be.equal("l10n.hello(name)");
	});
	it("should return l10n call when messages with 2 variables", () => {
		expect(buildFunctionCall("l10n", "hello", ["name", "otherName"])).to.be.equal(
			"l10n.hello(name, otherName)",
		);
		expect(getFunctionCall("l10n", "hello", ["name", "otherName"])).to.be.equal(
			"l10n.hello(name, otherName)",
		);
	});
});
