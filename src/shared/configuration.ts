import * as vscode from 'vscode';

export enum AddMessageInStatus {
  All = 'all',
  Template = 'template',
}

const getConfiguration = vscode.workspace.getConfiguration('l10nization');
export const getYamlFileName = getConfiguration.get<string>('yamlFile', 'l10n.yaml');
export const getAppLocalizationsVariable = getConfiguration.get<string>('appLocalizationsVariable', 'l10n');
export const getHaveDescription = getConfiguration.get<boolean>('haveDescription', false);
export const getCopyMetadataInAllFiles = getConfiguration.get<boolean>('copyMetadataInAllFiles', true);
export const getSortArbEnabled = getConfiguration.get<boolean>('arbSort', true);
export const getGenerationActivted = getConfiguration.get<boolean>('flutterPubGetEnabled', true);
export const getAddNewMessagesIn = getConfiguration.get<string>('addNewMessagesIn', 'all') as AddMessageInStatus;
export const getSortArbOnSave = getConfiguration.get<boolean>('sortOnSave', true);
export const getFormatArbEnabled = getConfiguration.get<boolean>('formatArb', true);
