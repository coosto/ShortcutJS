"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const webpack_1 = require("webpack");
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const env = process && process.env && process.env.NODE_ENV;
const tsConfig = env && env === 'production' ? { configFileName: 'tsconfig.prod.json' } : {};
exports.default = {
    entry: path_1.join(__dirname, 'src/shortcut.ts'),
    devtool: 'cheap-source-map',
    output: {
        path: path_1.join(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'shortcutJS',
        filename: 'shortcut.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['es2015'] }
                    },
                    {
                        loader: 'ts-loader',
                        options: tsConfig
                    }
                ],
                exclude: [
                    path_1.join(__dirname, 'node_modules'),
                    path_1.join(__dirname, 'test')
                ]
            }]
    },
    plugins: [
        new webpack_1.optimize.UglifyJsPlugin({ sourceMap: true }),
        new TypedocWebpackPlugin({
            theme: 'minimal',
            out: 'docs',
            target: 'es6',
            ignoreCompilerErrors: true
        }, 'src')
    ]
};
