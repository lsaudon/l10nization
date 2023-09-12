import { defaultGeneration, generationEnabledSection, parentSection } from '../shared/constants';
import { getConfiguration } from './getConfiguration';
import { runIfExist } from './runIfExist';

export async function runGeneration(): Promise<void> {
  if (!getConfiguration(parentSection).get<boolean>(generationEnabledSection, defaultGeneration)) {
    return;
  }
  await runIfExist('flutter.task.genl10n');
}
