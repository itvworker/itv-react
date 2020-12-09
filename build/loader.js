const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    loaders: {
        css: ["vue-style-loader", {
            loader: "css-loader",
            options: {
                "sourceMap": true
            }
        }, {
            loader: "units-loader",
            options: {
                unit: "rem",
                divisor: 37.5,
                accuracy: 6
            }
        }],
        postcss: ["vue-style-loader", {
            loader: "css-loader",
            options: {
                "sourceMap": true
            }
        }, {
            loader: "units-loader",
            options: {
                unit: "rem",
                divisor: 37.5,
                accuracy: 6
            }
        }],
        less: ["vue-style-loader",  "less-loader",
        {
            loader: "sass-resources-loader",
            options: {
                resources: [resolve('src/assets/css/const.less')]
            }
        },
        {
            loader: "units-loader",
            options: {
                unit: "rem",
                divisor: 37.5,
                accuracy: 6,
                raw: "rpx"
            }
        }, {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        }]
    }
}
