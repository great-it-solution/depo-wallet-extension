const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'account.js',
    library: {
        type: 'umd',
    },
  },
  plugins: [
    new webpack.IgnorePlugin({
        checkResource(resource) {
          // do something with resource
          return !!resource.match(/^\.\/wordlists\/(?!english)/, /bip39\/src$/);
        },
      })
    // new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
  ],
  resolve: {
    fallback: {
        "stream": require.resolve("stream-browserify"),
        // "assert": require.resolve("assert"),
        "crypto": require.resolve("crypto-browserify")
    }
  }
};