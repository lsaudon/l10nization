import { beforeEach, describe, expect, it, vi } from "vitest";

const { getConfigurationMock, findFilesMock, openTextDocumentMock, showErrorMessageMock } =
	vi.hoisted(() => ({
		getConfigurationMock: vi.fn(),
		findFilesMock: vi.fn(),
		openTextDocumentMock: vi.fn(),
		showErrorMessageMock: vi.fn(),
	}));

vi.mock("vscode", () => ({
	workspace: {
		getConfiguration: getConfigurationMock,
		findFiles: findFilesMock,
		openTextDocument: openTextDocumentMock,
	},
	window: {
		showErrorMessage: showErrorMessageMock,
	},
}));

import { getArbFiles } from "../../../features/extension/getArbFiles";

const makeArbFile = (path: string) => ({ path });

describe("getArbFiles", () => {
	beforeEach(() => {
		getConfigurationMock.mockReset();
		findFilesMock.mockReset();
		openTextDocumentMock.mockReset();
		showErrorMessageMock.mockReset();
	});

	it("returns all arb files when addNewMessagesIn is set to all", async () => {
		getConfigurationMock.mockReturnValue({
			get: (key: string, defaultValue?: unknown) => {
				if (key === "yamlFile") {
					return "l10n.yaml";
				}
				if (key === "addNewMessagesIn") {
					return "all";
				}
				return defaultValue;
			},
		});

		openTextDocumentMock.mockResolvedValue({
			getText: () => "arb-dir: lib/l10n/arb\ntemplate-arb-file: app_en.arb\n",
		});

		const arbFiles = [
			makeArbFile("/workspace/demo_app/lib/l10n/arb/app_en.arb"),
			makeArbFile("/workspace/demo_app/lib/l10n/arb/app_fr.arb"),
		];

		findFilesMock.mockImplementation(async (pattern: string) => {
			if (pattern === "**/demo_app/l10n.yaml") {
				return [{ path: "/workspace/demo_app/l10n.yaml" }];
			}
			if (pattern === "**/demo_app/lib/l10n/arb/*.arb") {
				return arbFiles;
			}
			if (pattern === "**/lib/l10n/arb/*.arb") {
				return arbFiles;
			}
			return [];
		});

		const [resultFiles, templateFile] = await getArbFiles("demo_app");

		expect(resultFiles).toHaveLength(2);
		expect(templateFile?.path).toBe("/workspace/demo_app/lib/l10n/arb/app_en.arb");
		expect(resultFiles.map((file) => file.path)).toEqual(arbFiles.map((file) => file.path));
	});

	it("returns only the template arb file when addNewMessagesIn is set to template", async () => {
		getConfigurationMock.mockReturnValue({
			get: (key: string, defaultValue?: unknown) => {
				if (key === "yamlFile") {
					return "l10n.yaml";
				}
				if (key === "addNewMessagesIn") {
					return "template";
				}
				return defaultValue;
			},
		});

		openTextDocumentMock.mockResolvedValue({
			getText: () => "arb-dir: lib/l10n/arb\ntemplate-arb-file: app_en.arb\n",
		});

		const templateFile = makeArbFile("/workspace/demo_app/lib/l10n/arb/app_en.arb");
		const otherFile = makeArbFile("/workspace/demo_app/lib/l10n/arb/app_fr.arb");

		findFilesMock.mockImplementation(async (pattern: string) => {
			if (pattern === "**/demo_app/l10n.yaml") {
				return [{ path: "/workspace/demo_app/l10n.yaml" }];
			}
			if (pattern === "**/demo_app/lib/l10n/arb/*.arb") {
				return [templateFile, otherFile];
			}
			if (pattern === "**/lib/l10n/arb/*.arb") {
				return [templateFile, otherFile];
			}
			return [];
		});

		const [resultFiles, templateResultFile] = await getArbFiles("demo_app");

		expect(resultFiles).toHaveLength(1);
		expect(resultFiles[0]?.path).toBe("/workspace/demo_app/lib/l10n/arb/app_en.arb");
		expect(templateResultFile?.path).toBe("/workspace/demo_app/lib/l10n/arb/app_en.arb");
	});

	it("throws when template mode is selected but the template arb file cannot be found", async () => {
		getConfigurationMock.mockReturnValue({
			get: (key: string, defaultValue?: unknown) => {
				if (key === "yamlFile") {
					return "l10n.yaml";
				}
				if (key === "addNewMessagesIn") {
					return "template";
				}
				return defaultValue;
			},
		});

		openTextDocumentMock.mockResolvedValue({
			getText: () => "arb-dir: lib/l10n/arb\ntemplate-arb-file: app_en.arb\n",
		});

		findFilesMock.mockImplementation(async (pattern: string) => {
			if (pattern === "**/demo_app/l10n.yaml") {
				return [{ path: "/workspace/demo_app/l10n.yaml" }];
			}
			if (pattern === "**/demo_app/lib/l10n/arb/*.arb") {
				return [makeArbFile("/workspace/demo_app/lib/l10n/arb/app_fr.arb")];
			}
			if (pattern === "**/lib/l10n/arb/*.arb") {
				return [makeArbFile("/workspace/demo_app/lib/l10n/arb/app_fr.arb")];
			}
			return [];
		});

		await expect(getArbFiles("demo_app")).rejects.toThrow(
			'No template ARB file was found for project "demo_app". Check the "template-arb-file" setting in l10n.yaml.',
		);
		expect(showErrorMessageMock).toHaveBeenCalledWith(
			'No template ARB file was found for project "demo_app". Check the "template-arb-file" setting in l10n.yaml.',
		);
	});
});
