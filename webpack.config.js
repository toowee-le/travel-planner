const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    devtool: 'source-map',
    mode: 'development',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}