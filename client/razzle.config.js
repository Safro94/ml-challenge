'use strict';

const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const path = require('path');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	plugins: [
		{
			name: 'purgecss',
			options: {
				path: path.resolve(__dirname, 'src/**/*'),
			},
		},
		{
			name: 'compression',
			options: {
				brotli: false,
				gzip: true,
				compressionPlugin: {
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: /\.(js|css|html|svg)$/,
					compressionOptions: { level: 9 },
					minRatio: 0.8,
				},
			},
		},
	],
	modify(config, { target, dev }, webpack) {
		const appConfig = Object.assign({}, config);

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

		appConfig.module.rules.push({
			test: /\.(sass|scss)$/,
			exclude: [path.resolve(__dirname, './node_modules')],
			use: ['isomorphic-style-loader', cssLoader, postCssLoader, scssLoader],
		});

		appConfig.plugins.push(
			new webpack.DefinePlugin({
				'process.env.SERVER_API_URL': JSON.stringify(
					process.env.SERVER_API_URL
				),
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

			/*
				Esto seria mas apuntado a produccion, pero a fines del test lo puse en dev
			*/
			appConfig.optimization = Object.assign({}, appConfig.optimization, {
				minimize: true,
				minimizer: [new TerserPlugin()],
				runtimeChunk: true,
				splitChunks: {
					chunks: 'all',
					minSize: 30000,
					maxSize: 1000000,
					minChunks: 1,
					name: dev,
					cacheGroups: {
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							reuseExistingChunk: true,
						},
						main: {
							minChunks: 2,
							reuseExistingChunk: true,
						},
					},
				},
			});
		}

		return appConfig;
	},
};
