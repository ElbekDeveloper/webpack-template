const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    devtool: "none",
    entry: "./src/index.js",
    output: {
        filename: "main.[contentHash].js", // 'contentHash' prevents browser cache problem
        path: path.resolve(__dirname, "dist")
    },
    watch: true,
    devServer: {
        stats: {
            children: false,
            maxModules: 0
        },
        port: 3001
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    "style-loader", //3. Inject styles to DOM
                    "css-loader", //2. Turns css to commonjs
                    "sass-loader" //1. Turns scss to css
                ]
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "imgs"
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html"
        }),
        new CleanWebpackPlugin(),
    ],
};