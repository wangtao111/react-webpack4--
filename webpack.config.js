var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
      filename: 'js/[name].js',//输出文件名
      path: __dirname
  },
  module: {
      rules: [
          {
              test: /\.less$/,
              loader: 'style-loader!css-loader!less-loader'
          },
          {//CSS处理
              test: /\.css$/,
              loader: "style-loader!css-loader?modules",
              exclude: /node_modules/,
          },
          {//antd样式处理
              test:/\.css$/,
              exclude:/src/,
              use:[
                  { loader: "style-loader",},
                  {
                      loader: "css-loader",
                      options:{
                          importLoaders:1
                      }
                  }
              ]
          },
          // {
          //     test: /\.js$/,
          //     exclude: /node_modules/,
          //     loader: 'babel-loader'
          // },
          {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['es2015', 'react', "stage-0"],
                      plugins: [
                          ['import', {libraryName: "antd", style: "css"}],
                          ['react-hot-loader/babel'],
                          ["transform-class-properties"]
                      ]
                  }
              }
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'url-loader',
              query: {
                  limit: 10000,
                  name: '[name].[ext]'
              }
          },
          {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              query: {
                  limit: 10000,
                  name: '[name].[hash:7].[ext]'
              }
          }
      ],
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname,'public','index.html'),
          filename:'index.html'
      }),
      new ExtractTextPlugin({
          filename: 'css/styles.[hash:8].css'
      }),
      new OpenBrowserPlugin({
          url: `http://localhost:2000`,
      }),
      new webpack.NoEmitOnErrorsPlugin()
  ]
};
