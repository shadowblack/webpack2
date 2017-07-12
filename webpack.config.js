const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entryHtmlPlugins = Object.values(["index","landing"]).map(function(entryName) {
    return new HtmlWebpackPlugin({
        filename: "../app/"+entryName + '.html',
        template: "./templates/"+entryName + '.ejs',
        links:[
            '../node_modules/materialize-css/dist/css/materialize.min.css'
        ],
        /*minify: {
            collapseWhitespace: 'true'
        }*/
        //chunks: [entryName]
        inject: 'body'
    })
});

const config = {
    //entry: './main.ts',
    entry : {
        "main" : [
            './src/css/base.css',
            './src/js/play.js',
            './src/js/hola.ts',
        ],
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].bundle.js",
        publicPath: "/dist"
    },

    plugins: [
        //new ExtractTextPlugin("[name].css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$' : 'jquery',
            'window.jQuery' : 'jquery',
            materialize:'materialize-css'
        })
    ].concat(entryHtmlPlugins),
    module: {
        rules: [
            // This is required
            {
                 test: /\.ts$/, loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader : 'resolve-url-loader'
                    },
                    {
                        loader : 'sass-loader?sourceMap'
                    }
                ]
            }
        ],
    }
};

module.exports = config;