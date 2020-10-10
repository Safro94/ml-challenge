'use strict';

const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');

module.exports = {
	modify(config, { target, dev }, webpack) {
		const appConfig = config;
		const postCssLoader = {
			loader: 'postcss-loader',
			options: {
				sourceMap: dev,
				config: {
					path: 'postcss.config.js',
				},
			},
		};

		const scssLoader = {
			loader: 'sass-loader',
			options: {
				sourceMap: dev,
			},
		};

		const cssLoader = {
			loader: 'css-loader',
			options: {
				sourceMap: dev,
				importLoaders: 1,
				modules: {
					localIdentName: dev
						? '[path]_[name]_[local]--[hash:base64:5]'
						: undefined,
				},
			},
		};

		const resolverLoader = {
			loader: 'resolve-url-loader',
			options: {
				attempts: 1,
				sourceMap: true,
			},
		};

		appConfig.module.rules.push({
			test: /\.(sass|scss)$/,
			exclude: [path.resolve(__dirname, './node_modules')],
			use: [
				'isomorphic-style-loader',
				cssLoader,
				resolverLoader,
				postCssLoader,
				scssLoader,
			],
		});

		appConfig.plugins.push(
			new webpack.DefinePlugin({
				'process.env.SERVER_API_URL': JSON.stringify(process.env.PUBLIC_PATH),
			})
		);

		if (target === 'web') {
			const filename = path.resolve(__dirname, 'build');

			appConfig.plugins.push(
				new LoadableWebpackPlugin({
					outputAsset: false,
					writeToDisk: { filename },
				})
			);

			appConfig.output.filename = dev
				? 'static/js/[name].js'
				: 'static/js/[name].[chunkhash:8].js';
		}

		if (!dev && target === 'web') {
			process.env.CI = false;
			appConfig.plugins.push(
				new CompressionPlugin({
					filename: '[path][query]',
					algorithm: 'gzip',
				}),
				new OptimizeJsPlugin({
					sourceMap: false,
				})
			);

			appConfig.optimization.splitChunks = {
				chunks: 'all',
				minSize: 30000,
				maxSize: 1000000,
				minChunks: 1,
				maxAsyncRequests: Number(process.env.MAX_ASYNC_REQUEST),
				maxInitialRequests: 3,
				name: true,
				cacheGroups: {
					main: {
						chunks: 'all',
						minChunks: 2,
						reuseExistingChunk: true,
						enforce: true,
					},
				},
			};
			appConfig.optimization.runtimeChunk = true;
		}

		return appConfig;
	},
};
