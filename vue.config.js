const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    // hot: false,
    // liveReload: false
  },
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [
          {from: './node_modules/@tonclient/lib-web/tonclient.wasm', to: 'tonclient_1.20.1.wasm'},
        ],
      }),
    ],
  },
}
