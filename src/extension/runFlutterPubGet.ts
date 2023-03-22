import {
  defaultPubGet,
  flutterPubGetEnabledSection,
  parentSection
} from '../shared/constants';
import { getConfiguration } from './getConfiguration';
import { runIfExist } from './runIfExist';

export async function runFlutterPubGet(): Promise<void> {
  if (
    !getConfiguration(parentSection).get<boolean>(
      flutterPubGetEnabledSection,
      defaultPubGet
    )
  ) {
    return;
  }
  await runIfExist('flutter.packages.get');
}
