import { describe, expect, it } from "vitest";
import { buildUpdatedArbContent } from "../../../core/arb/buildUpdatedArbContent";

describe("buildUpdatedArbContent", () => {
	it("adds the localization entry and metadata while preserving the existing JSON structure", () => {
		const result = buildUpdatedArbContent(
			JSON.stringify({
				hello: "Hello",
				"@hello": {
					description: "Existing description",
				},
			}),
			{
				isMetadataEnabled: true,
				key: "welcome",
				description: "Welcome message",
				value: "Welcome",
				placeholders: [],
			},
			true,
		);

		expect(JSON.parse(result)).toMatchObject({
			hello: "Hello",
			welcome: "Welcome",
			"@welcome": {
				description: "Welcome message",
			},
		});
	});

	it("keeps metadata disabled when the option says so for non-template files", () => {
		const result = buildUpdatedArbContent(
			JSON.stringify({
				hello: "Hello",
			}),
			{
				isMetadataEnabled: false,
				key: "welcome",
				description: "Welcome message",
				value: "Welcome",
				placeholders: [],
			},
			false,
		);

		expect(JSON.parse(result)).toMatchObject({
			hello: "Hello",
			welcome: "Welcome",
		});
		expect(JSON.parse(result)).not.toHaveProperty("@welcome");
	});
});
