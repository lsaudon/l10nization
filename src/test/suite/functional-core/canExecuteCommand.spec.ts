import { describe, expect, it } from "vitest";
import { canExecuteCommand } from "../../../core/commands/canExecuteCommand";

describe("canExecuteCommand", () => {
	it("returns true when the command is available", () => {
		expect(
			canExecuteCommand(["flutter.task.genl10n", "other.command"], "flutter.task.genl10n"),
		).toBe(true);
	});

	it("returns false when the command is missing", () => {
		expect(canExecuteCommand(["other.command"], "flutter.task.genl10n")).toBe(false);
	});
});
