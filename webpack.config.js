var path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.jsx'),
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
}
