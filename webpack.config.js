module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { test: /\.ts(x?)$/, loader: 'ts-loader' }
        ]
    }
};