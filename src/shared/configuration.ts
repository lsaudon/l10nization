import * as vscode from 'vscode';

const getConfiguration = vscode.workspace.getConfiguration('l10nization');
export const getYamlFileName = getConfiguration.get<string>('yamlFile', 'l10n.yaml');
export const getAppLocalizationsVariable = getConfiguration.get<string>('appLocalizationsVariable', 'l10n');
export const getHaveDescription = getConfiguration.get<boolean>('haveMetadatas', false);
export const getCopyMetadataInAllFiles = getConfiguration.get<boolean>('copyMetadataInAllFiles', true);
export const getSortArbEnabled = getConfiguration.get<boolean>('arbSort', true);
export const getGenerationActivted = getConfiguration.get<boolean>('flutterPubGetEnabled', true);
