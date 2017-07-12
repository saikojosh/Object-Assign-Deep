/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const CleanWebpackPlugin = require('clean-webpack-plugin');


const libraryName = 'objectAssignDeep';

const plugins = [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'commons.js',
    //   minChunks: 2,
    // }),
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) })
];
let outputFile = null;

if (env === 'build') {
    outputFile = `${libraryName}.js`;
} else {
    outputFile = `${libraryName}.js`;
}

const config = {
    entry: `${__dirname}/src/objectAssignDeep.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/dist`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loaders: 'eslint-loader',
            },
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.json', '.js'],
    },
    plugins,
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
};

module.exports = config;
