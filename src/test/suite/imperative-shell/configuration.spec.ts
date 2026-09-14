import { beforeEach, describe, expect, it, vi } from "vitest";

const { getConfigurationMock } = vi.hoisted(() => ({
	getConfigurationMock: vi.fn(),
}));

vi.mock("vscode", () => ({
	workspace: {
		getConfiguration: getConfigurationMock,
	},
}));

import { Configuration } from "../../../infrastructure/shared/configuration";

describe("Configuration", () => {
	beforeEach(() => {
		getConfigurationMock.mockReset();
		delete (Configuration as unknown as { instance?: Configuration }).instance;
	});

	it("prefers the current setting over deprecated aliases", () => {
		getConfigurationMock.mockReturnValue({
			get: (key: string, defaultValue?: unknown) => {
				if (key === "haveDescription") {
					return true;
				}
				if (key === "haveMetadatas") {
					return false;
				}
				if (key === "generationEnabled") {
					return false;
				}
				if (key === "flutterPubGetEnabled") {
					return true;
				}
				return defaultValue;
			},
		});

		const config = Configuration.getInstance();

		expect(config.getHaveDescription()).toBe(true);
		expect(config.getGenerationActivated()).toBe(false);
	});

	it("falls back to the deprecated setting when the current one is not set", () => {
		getConfigurationMock.mockReturnValue({
			get: (key: string, defaultValue?: unknown) => {
				if (key === "haveDescription") {
					return undefined;
				}
				if (key === "haveMetadatas") {
					return true;
				}
				if (key === "generationEnabled") {
					return undefined;
				}
				if (key === "flutterPubGetEnabled") {
					return true;
				}
				return defaultValue;
			},
		});

		const config = Configuration.getInstance();

		expect(config.getHaveDescription()).toBe(true);
		expect(config.getGenerationActivated()).toBe(true);
	});
});
