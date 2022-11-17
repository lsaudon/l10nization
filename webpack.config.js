const path = require('path');

module.exports = () => {
  /**
   * @type {import("webpack").Configuration}
   */
  const config = {
    entry: './src/extension/extension.ts',
    externals: {
      vscode: 'commonjs vscode'
    },
    infrastructureLogging: {
      level: 'log'
    },
    mode: 'development',
    module: {
      rules: [
        {
          exclude: /node_modules/u,
          test: /\.ts$/u,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    output: {
      filename: 'extension.js',
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    target: 'node'
  };
  return config;
};
