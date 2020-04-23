const path = require('path');
const webpack = require('webpack');

const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 指定babel编译环境
process.env.BABEL_ENV ='development';

module.exports = {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', resolvePath('../src/client/app/index.js')]
  },
  output: {
    filename: '[name].js',
    path: resolvePath('../dist/static'),
    publicPath: 'http://localhost:9002/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__IS_PROD__': false,
      '__SERVER__': false
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs'
        }
      }
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
};
