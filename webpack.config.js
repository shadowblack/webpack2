const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    entry : './js/play.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js",
        publicPath: "/dist"
    },
    plugins: [new HtmlWebpackPlugin({
        filename: '../index.html',
        /*title: 'mi webpack',*/
        template: './templates/plantilla.ejs',
        links:['./css/base2.css'],
        minify: {
            collapseWhitespace: 'true'
        }
    })],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}

module.exports = config;