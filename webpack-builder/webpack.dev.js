const webpack = require('webpack'); // eslint-disable-line
const request = require('request'); // eslint-disable-line
// verifiy if server run
request('http://localhost:2368', error => {
  if (error) {
    console.error('❌  start the server before run dev server'); // eslint-disable-line
    process.exit();
  }
});
module.exports = {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/assets/built',
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true,
    inline: true,
    stats: {
      colors: true,
    },
    proxy: {
      '/': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 2368,
        },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
