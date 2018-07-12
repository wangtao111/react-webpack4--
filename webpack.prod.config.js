const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: [
            './src/index.js'
        ]
    },
    output: {
        filename: '[name].[hash:8].js',
        chunkFilename: 'chunk.[id].[hash:8].js',
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
            }, /*解析css, 并把css变成文件通过link标签引入*/
            {
                test: /\.bundle\.js$/,
                use: {
                    loader: 'bundle-loader',
                    options: {
                        name: '[name]',
                        lazy: true
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', "stage-0"],
                        plugins: [
                            ['react-hot-loader/babel'],
                            ["transform-class-properties"],
                            ['import', {"libraryName": "antd", "style": "css"}]
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
    resolve: {
        alias: {
        }
    },
    performance: {

        hints: "warning", // 枚举

        maxAssetSize: 300000, // 整数类型（以字节为单位）

        maxEntrypointSize: 500000, // 整数类型（以字节为单位）
    },
    optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        minimize: true,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'public','index.html'),
            filename:'index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.[hash:8].css'
        }),
        new CleanWebpackPlugin(['dist'],
            {
                root: __dirname,
                verbose: true, //日志
                dry: false, //不要删除任何东西，主要用于测试
                exclude: []//排除不删除的目录，主要用于避免删除公用的文件
            }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
