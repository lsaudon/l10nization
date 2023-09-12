import { getGenerationActivted } from '../shared/configuration';
import { runIfExist } from './runIfExist';

export async function runGeneration(): Promise<void> {
  if (!getGenerationActivted) {
    return;
  }
  await runIfExist('flutter.task.genl10n');
}
