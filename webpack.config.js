const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['whatwg-fetch','./js/main.js'],
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle/out.js'
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        publicPath: "/",
        inline: true,
        port: 3001
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },

};