var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './spread-sheet.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'spread-sheet.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};