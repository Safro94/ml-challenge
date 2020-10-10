import express from 'express';
import React from 'react';
import path from 'path';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import App from 'components/app';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
	.disable('x-powered-by')
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
	.get('/*', (req, res) => {
		const context = {};

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
			`<!doctype html>
    <html lang="es">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Meli challenge</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${extractor.getLinkTags()}
        <style>${[...css].join('')}</style>
    </head>
    <body>
        <div id="root">${markup}</div>    
        <script src="${assets.client.js}" defer crossorigin></script>
    </body>
</html>`
		);
	});

export default server;
