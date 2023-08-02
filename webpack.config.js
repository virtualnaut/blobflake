const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.ts',
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.d.ts'],
    modules: ['node_modules'],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "src", "app", "index.html"),
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
