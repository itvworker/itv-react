const path = require('path')
const config = require('./config')
const loader = require('./loader')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    context: resolve(''),
    entry: {
        app: ['@babel/polyfill', './src/entry/main.js']
    },
    output: {
        path: resolve('dist'),
        filename: '[name].[hash:4].js', // [name]打包后的文件名称,进入是什么名字出来也是
        chunkFilename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            $p: resolve('packages'),
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {loader: 'vue-loader'}
                ]

            },
            {
                test: /\.(less|css)$/,
                use: [

                    {
                        loader: 'vue-style-loader'
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: [resolve('src/assets/css/const.less'), resolve('packages/assets/css/theme.less')]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: [
                    {loader: 'babel-loader'}
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('dist/static/img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('dist/static/media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: resolve('dist/static/font/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    devServer: {
        // 设置基本结构
        contentBase: resolve('dist'),
        host: '0.0.0.0', // 服务器IP地址,可以是localhost
        compress: true, // 服务端压缩是否开启
        open: false, // 自动打开浏览器
        hot: true, // 开启热更新
        port: 8888
    },
    stats: {
        children: false,
        warnings: true,
        source: true,
        hash: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.dev.html',
            inject: true
        })
    ]
}
