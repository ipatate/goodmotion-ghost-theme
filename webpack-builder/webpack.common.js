const webpack = require('webpack'); // eslint-disable-line
const path = require('path');
const commonPath = require('./common-paths');

const config = {
  entry: [`${path.resolve(__dirname, '../assets/js')}/main.js`],
  output: {
    filename: 'bundle.js',
    path: commonPath.outputPath,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          {
            loader: 'img-loader',
            options: {
              // enabled: process.env.NODE_ENV === 'production',
              enabled: true,
              gifsicle: {
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
                arithmetic: false,
              },
              optipng: false, // disabled
              pngquant: {
                floyd: 0.5,
                speed: 2,
              },
              svgo: {
                plugins: [{ removeTitle: true }, { convertPathData: false }],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.png/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin()],
};

module.exports = config;
