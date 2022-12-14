const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
const {manifestTransform} = require('./scripts/transform');

module.exports = (env, options) => {
	// console.log('options ==>', options);
	return {
		devtool: 'cheap-module-source-map',
		entry: {
			content_script: './src/content-scripts/index.js',
			background: './src/background/index.js',
			popup: './src/popup-page/index.js',
			option: './src/option-page/index.js',
			home: './src/home-page/index.js',
		},
		module: {
			rules: [
				{
					test: /\.worker\.js$/,
					use: {loader: 'worker-loader'},
				},
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: ['babel-loader', 'eslint-loader'],
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.svg$/,
					use: ['@svgr/webpack'],
				},
				{
					test: /\.(gif|png|jpe?g)$/i,
					use: [
						'file-loader',
						{
							loader: 'image-webpack-loader',
							options: {
								bypassOnDebug: true, // webpack@1.x
								disable: true, // webpack@2.x and newer
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: ['.mjs', '*', '.js', '.jsx', '.css', '.json'],
		},
		output: {
			path: __dirname + '/dist/' + options.browser,
			publicPath: '/',
			filename: '[name].bundle.js',
		},
		optimization: {
			minimize: options.mode === 'production',
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
		plugins: [
			new CopyWebpackPlugin(
				[
					{from: './src/popup-page/popup.html', force: true},
					{from: './src/home-page/home.html', force: true},
					{from: './src/option-page/option.html', force: true},
					{from: './src/app/', force: true},
				],
				{
					globOptions: {
						dot: true,
						gitignore: true,
						ignore: ['**/.DS_Store'],
					},
				}
			),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify({...options, ...dotenv.parsed}),
			}),
			new CopyWebpackPlugin([
				{
					from: './src/app/manifest.json',
					force: true,
					transform(content, path) {
						return manifestTransform(content, path, options);
					},
				},
			]),
		],
		devServer: {
			contentBase: './dist/' + options.browser,
			hot: true,
		},
	};
};
