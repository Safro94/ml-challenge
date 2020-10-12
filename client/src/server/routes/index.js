import express from 'express';
import React from 'react';
import path from 'path';

import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import routes from 'routes/routes';

import App from 'components/app';

import template from '../template';

const server = express();

server
	.disable('x-powered-by')
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
	.get('/*', async (req, res) => {
		/*
			Obtengo la ruta de la url y matcheo con mis rutas
			para ver si tiene un requestInitialData y fetchear
			la data en el server asi viene la vista armada. Si
			no tiene requestInitialData, devuelvo un objeto vacio
		*/
		const currentRoute = routes.find(route => matchPath(req.path, route));
		let initialData;
		if (currentRoute?.requestInitialData) {
			initialData = await currentRoute.requestInitialData(req);
		} else {
			initialData = {};
		}
		const context = { initialData };

		const css = new Set();
		const insertCss = (...styles) =>
			styles.forEach(style => css.add(style._getCss()));

		const extractor = new ChunkExtractor({
			statsFile: path.resolve('build/loadable-stats.json'),
			entrypoints: ['client'],
		});

		const markup = renderToString(
			<ChunkExtractorManager extractor={extractor}>
				<StaticRouter context={context} location={req.url}>
					<StyleContext.Provider value={{ insertCss }}>
						<App />
					</StyleContext.Provider>
				</StaticRouter>
			</ChunkExtractorManager>
		);

		res.send(
			template({
				markup,
				js: extractor,
				styles: css,
				initialData,
			})
		);
	});

export default server;
