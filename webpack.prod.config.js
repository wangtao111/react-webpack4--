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
        filename: 'js/[name].[hash:8].js',
        // chunkFilename: 'dist/chunk.[id].[hash:8].js',
        path: path.join(__dirname, './dist')
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
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'img/[name].[ext]'
                }
            }
        ],
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
            filename: 'css/styles.[hash:8].css'
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
