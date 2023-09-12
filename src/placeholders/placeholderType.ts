import { QuickPickItem } from 'vscode';

export enum PlaceholderType {
  String = 'String',
  int = 'int',
  num = 'num',
  double = 'double',
  DateTime = 'DateTime',
  plural = 'plural',
}

export function getPlaceholderTypes() {
  return Object.keys(PlaceholderType).filter((p) => isNaN(Number(p)));
}

export function getPlaceholderType(placeholderTypeValue: string) {
  return Object.values(PlaceholderType).filter((p) => p.toString() === placeholderTypeValue)[0] as PlaceholderType;
}

export class PlaceholderTypeItem implements QuickPickItem {
  constructor(readonly label: string) {
    // do nothing.
  }
}
