const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    entry : {
        "styles" : ['./src/css/base.css'],
        "main" : './src/js/play.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].bundle.js",
        publicPath: "/dist"
    },
    plugins: [

        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './templates/plantilla.ejs',
            links:['./dist/styles.bundle.js'],
            minify: {
                collapseWhitespace: 'true'
            }
        }),

        new ExtractTextPlugin("[name].css")
    ],
    module: {
        rules: [
            // This is required
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
                    }
                ]
            }
        ]
    }
}

module.exports = config;