let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let {CleanWebpackPlugin} = require("clean-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
    ],
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}