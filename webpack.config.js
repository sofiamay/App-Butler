var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, './build/'),
    filename: 'server.js',
  },
  // libraryTarget: 'commonjs2',
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: { warnings: false }
  //   })
  // ],
  externals: [
    /^\.\/assets$/,
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[@a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/);
      cb(null, Boolean(isExternal));
    },
  ],
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel' // 'babel-loader' is also a legal name to reference
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  }
};