var path = require('path');

const root = require('app-root-path').path;
console.log('rootPath='+root);
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

module.exports = {
	devtool: 'inline-source-map',
    entry: [
    	'webpack/hot/poll?1000',
    	//'webpack-hot-middleware/client', 
    	path.join(root, 'bin/www.ts')
    ],
    target: 'node',
    debug: true,
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    plugins: [
        new LiveReloadPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin({ quiet: false }),
        new webpack.NoErrorsPlugin()
    ],
    output: {
    	filename: '[name].bundle.js',
    	sourceMapFilename: '[name].map',
    	chunkFilename: '[id].chunk.js',
        path: path.join(root, 'build'),
        libraryTarget: 'commonjs',
        publicPath: '/'
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
    },
    devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
        },
        outputPath: `${root}/build`
      },
};