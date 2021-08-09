const JSONMinifyPlugin = require('node-json-minify'),
  CopyPlugin = require('copy-webpack-plugin');

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
          {from: './node_modules/@tonclient/lib-web/tonclient.wasm', to: 'tonclient_1.13.0.wasm'},
          {
            from: './src/lib/browser/interface/interfaces.json', to: 'interfaces.json', transform: function (content) {
              return JSONMinifyPlugin(content.toString());
            },
          },
        ],
      }),
    ],
  },
}
