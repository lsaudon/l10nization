import * as path from 'path';

const PARENT_DIRECTORY = '..';

export const resolvePath = (inputPath: string): string =>
  path.join(
    ...path
      .normalize(inputPath)
      .split(path.sep)
      .filter((segment) => segment !== PARENT_DIRECTORY),
  );
