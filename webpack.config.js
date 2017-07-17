const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entryHtmlPlugins = Object.values(["landing"]).map(function(entryName) {
    return new HtmlWebpackPlugin({
        filename: "../app/"+entryName + '.html',
        template: "./templates/"+entryName + '.ejs',
        links:[
            '../node_modules/materialize-css/dist/css/materialize.css',
        ],
        inject: 'body',
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
            './src/js/init.ts',
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
            },
            /*{

            test: /\.ejs$/,
            loader: 'ejs-html?title=The%20Big%20Gatsby&production'

            }*/
           /* {
                test: /\.ejs$/,
                loader: 'ejs-html-loader',
                options: {
                    title: "The Ant: An Introduction"
                }
            },*/
           /* {
                test: /\.ejs$/,
                loader: 'ejs-html-loader',
            },*/
            /*{
                test: /\.ejs$/,
                use: 'ejs-loader?variable=data'
            }*/
        ],
    },
    /*ejsHtml: {
        title: 'For Whom the Bell Rings',
        baseUrl: './src/js',
        delimiter: '?'
    }*/
};

module.exports = config;