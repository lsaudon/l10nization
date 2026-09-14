import * as vscode from "vscode";
import type { AddMessageInStatus } from "../../core/arb/addMessageInStatus";

export { AddMessageInStatus } from "../../core/arb/addMessageInStatus";

export class Configuration {
	private static instance: Configuration;
	private yamlFileName!: string;
	private appLocalizationsVariable!: string;
	private haveDescription!: boolean;
	private copyMetadataInAllFiles!: boolean;
	private sortArbEnabled!: boolean;
	private generationActivated!: boolean;
	private addNewMessagesIn!: AddMessageInStatus;
	private organizeOnSave!: boolean;

	private constructor() {
		this.reload();
	}

	public static getInstance(): Configuration {
		if (!Configuration.instance) {
			Configuration.instance = new Configuration();
		}
		return Configuration.instance;
	}

	private static getConfigValue<T>(
		config: vscode.WorkspaceConfiguration,
		key: string,
		fallback: T,
		legacyKey?: string,
	): T {
		const directValue = config.get<T | undefined>(key, undefined);
		if (typeof directValue !== "undefined") {
			return directValue as T;
		}

		if (legacyKey) {
			const legacyValue = config.get<T | undefined>(legacyKey, undefined);
			if (typeof legacyValue !== "undefined") {
				return legacyValue as T;
			}
		}

		return fallback;
	}

	public reload() {
		const config = vscode.workspace.getConfiguration("l10nization");
		this.yamlFileName = config.get<string>("yamlFile", "l10n.yaml");
		this.appLocalizationsVariable = config.get<string>("appLocalizationsVariable", "l10n");
		this.haveDescription = Configuration.getConfigValue<boolean>(
			config,
			"haveDescription",
			false,
			"haveMetadatas",
		);
		this.copyMetadataInAllFiles = config.get<boolean>("copyMetadataInAllFiles", true);
		this.sortArbEnabled = config.get<boolean>("arbSort", true);
		this.generationActivated = Configuration.getConfigValue<boolean>(
			config,
			"generationEnabled",
			true,
			"flutterPubGetEnabled",
		);
		this.addNewMessagesIn = config.get<string>("addNewMessagesIn", "all") as AddMessageInStatus;
		this.organizeOnSave = config.get<boolean>("organizeOnSave", true);
	}

	public getYamlFileName(): string {
		return this.yamlFileName;
	}

	public getAppLocalizationsVariable(): string {
		return this.appLocalizationsVariable;
	}

	public getHaveDescription(): boolean {
		return this.haveDescription;
	}

	public getCopyMetadataInAllFiles(): boolean {
		return this.copyMetadataInAllFiles;
	}

	public getSortArbEnabled(): boolean {
		return this.sortArbEnabled;
	}

	public getGenerationActivated(): boolean {
		return this.generationActivated;
	}

	public getAddNewMessagesIn(): AddMessageInStatus {
		return this.addNewMessagesIn;
	}

	public getOrganizeOnSave(): boolean {
		return this.organizeOnSave;
	}

	public toString(): string {
		return `
        YamlFileName: ${this.yamlFileName}
        AppLocalizationsVariable: ${this.appLocalizationsVariable}
        HaveDescription: ${this.haveDescription}
        CopyMetadataInAllFiles: ${this.copyMetadataInAllFiles}
        SortArbEnabled: ${this.sortArbEnabled}
        GenerationActivated: ${this.generationActivated}
        AddNewMessagesIn: ${this.addNewMessagesIn}
        OrganizeOnSave: ${this.organizeOnSave}
      `;
	}
}
