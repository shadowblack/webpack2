var path = require('path');
module.exports = {
    entry : './js/play.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js",
        publicPath: "/dist"
    },
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