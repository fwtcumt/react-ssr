const path = require('path');
const webpack = require('webpack');

// 构建前清理目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//生成 manifest 方便定位对应的资源文件
const ManifestPlugin = require('webpack-manifest-plugin');

// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 路径处理
const resolvePath = pathstr => path.resolve(__dirname, pathstr);

// 指定babel编译环境
process.env.BABEL_ENV ='development';

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: {
    main: resolvePath('../src/client/app/index.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: resolvePath('../dist/static'),
    publicPath: '/'
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
              name: 'img/[name].[hash:8].[ext]',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: '../server/asset-manifest.json',
    }),
    new webpack.DefinePlugin({
      '__IS_PROD__': true,
      '__SERVER__': false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          warnings: false,
          ie8: true,
          output: {
            comments: false
          }
        },
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        libs: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'libs'
        }
      }
    }
  }
};
