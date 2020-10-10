import express from 'express';
import expressStaticGzip from 'express-static-gzip';
import compression from 'compression';
import path from 'path';

import app from './server/routes';

if (module.hot) {
	module.hot.accept('./server/routes', function () {
		console.log('🔁  HMR Reloading `./server`...');
	});
	console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

export default express()
	.use(compression())
	.use(expressStaticGzip(path.join(__dirname, '../build/public')))
	.use((req, res) => app.handle(req, res))
	.use((error, req, res, next) => console.log(error))
	.listen(port, function (err) {
		if (err) {
			console.error(err);
			return;
		}
		console.log(`> Started on port ${port}`);
	});
