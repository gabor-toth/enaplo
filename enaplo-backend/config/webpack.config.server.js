const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './server/index'
    ],
    watch: true,
    target: 'node',
    mode: 'development',
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    })],
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        //extensions: [ '.js'],
    },
    module: {
        rules: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: '/node_modules'
        }]
    },
    plugins: [
        new StartServerPlugin('bundle.js'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server')
            }
        }),
    ],
    output: {
        path: path.join(__dirname, '..','.build'),
        filename: 'bundle.js'
    }
}