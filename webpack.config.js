var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var NoopPlugin = require('noop-webpack-plugin');

var isProduction = process.env.NODE_ENV == 'production';

var SASS_LOADERS = [{
		loader: 'style-loader',
	}, {
		loader: 'css-loader',
		options: {
			sourceMap: !isProduction,
			importLoaders: 1,
		},
	}, {
		loader: 'postcss-loader',
		options: {
			sourceMap: !isProduction,
		},
	}, {
		loader: 'sass-loader',
		options: {
			sourceMap: !isProduction,
			outputStyle: 'compressed',
			includePaths: [
				path.resolve('node_modules'),
			],
		},
}];


module.exports = {
	entry: path.join(__dirname, './src/app.js'),
	output: {
		publicPath: 'dist/',
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		libraryTarget: 'umd',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['es2015', 'stage-0', 'react'],
					plugins: ['transform-object-rest-spread'],
				}
			}],
		}, {
			test: /\.s(c|a)ss$/,
			exclude: /node_modules/,
			use: isProduction ? ExtractTextPlugin.extract({fallback: 'style-loader', use: SASS_LOADERS.slice(1)}) : SASS_LOADERS,
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': `"${process.env.NODE_ENV}"`,
			},
		}),
		isProduction ? new ExtractTextPlugin('app.css') : NoopPlugin(),
		isProduction ? new webpack.optimize.UglifyJsPlugin({output: {comments: false} }) : new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		modules: [
			'src',
			'node_modules',
		],
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	devServer: {
		historyApiFallback: true,
		compress: true,
    contentBase: './',
		hot: true,
		port: 8000,
		host: '0.0.0.0',
		disableHostCheck: true,
	},
	devtool: isProduction ? false : 'source-map',
};
