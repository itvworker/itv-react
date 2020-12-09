const path = require('path')
const config = require('./config')
const loader = require('./loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    mode: 'development',
    context: resolve(''),
    entry: {
        app: ['@babel/polyfill', './src/main.js']
    },
    output: {
        path: resolve('components'),
        filename: '[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(less|less)$/,
                use: [ //loader从后向前执行，顺序不能乱，会不能编译
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../',
                        },
                    },
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            importLoaders: 5,
                            javascriptEnabled: true
                        }
                    },
                    // {
                    //     loader: 'sass-resources-loader',
                    //     options: {
                    //         resources: [resolve('src/assets/css/animate.less'), resolve('src/assets/css/page.less'), resolve('src/assets/css/theme.less')]
                    //     }
                    // }

                ],
                include: [resolve('src')]
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ],
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: "markdown-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    esModule: false,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 1000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 1000,
                    name: 'static/font/[name].[hash:7].[ext]'
                }
            }
        ]

    },
    devServer: {
        // 设置基本结构
        contentBase: resolve('components'),
        host: '0.0.0.0', // 服务器IP地址,可以是localhost
        compress: true, // 服务端压缩是否开启
        open: false, // 自动打开浏览器
        hot: true, // 开启热更新
        port: 8787
    },
    stats: {
        children: false,
        warnings: true,
        source: true,
        hash: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.dev.html',
            inject: true
        }),
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          })
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../public'),
        //         to: '.',
        //         ignore: ['.*'],
        //     },
        // ]),
    ]
}
