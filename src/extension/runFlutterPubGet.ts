import {
  defaultPubGet,
  flutterPubGetEnabledSection,
  parentSection
} from '../shared/constants';
import { getConfiguration } from './getConfiguration';
import { runIfExist } from './runIfExist';

export async function runFlutterPubGet(): Promise<void> {
  const flutterPubGetEnabled = getConfiguration(parentSection).get<boolean>(
    flutterPubGetEnabledSection,
    defaultPubGet
  );
  if (flutterPubGetEnabled) {
    await runIfExist('flutter.packages.get');
  }
}
