const root = require('app-root-path').path;
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
    entry: `${root}/bin/www.ts`,
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    plugins: [
        new LiveReloadPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
    output: {
        filename: 'compiled', // output file
        path: `${root}/build`,
        libraryTarget: "commonjs"
    },
    resolve: {
        // Add in `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    resolveLoader: {
        root: [`${root}/node_modules`]
    },
    module: {
        loaders: [{
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            test: /\.tsx?$/,
            exclude: 'node_modules',
            loader: 'ts-loader'
        }]
    }
};