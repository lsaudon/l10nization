import { Configuration } from '../shared/configuration';
import { runIfExist } from './runIfExist';

export async function runGeneration(): Promise<void> {
  if (!Configuration.getInstance().getGenerationActivated()) {
    return;
  }
  await runIfExist('flutter.task.genl10n');
}
