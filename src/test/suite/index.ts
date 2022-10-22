import * as Mocha from 'mocha';
import * as glob from 'glob';
import * as path from 'path';

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    color: true,
    ui: 'tdd'
  });

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((resolve, reject) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return reject(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            return reject(new Error(`${failures} tests failed.`));
          }
          return resolve();
        });
      } catch (error) {
        return reject(error);
      }
    });
  });
}
