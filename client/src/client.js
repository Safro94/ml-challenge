import React from 'react';
import { hydrate, render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';

import { loadableReady } from '@loadable/component';

import StyleContext from 'isomorphic-style-loader/StyleContext';

import App from './components/app';

const history = createBrowserHistory();

const insertCss = (...styles) => {
	const removeCss = styles.map(style => style._insertCss());
	return () => removeCss.forEach(dispose => dispose());
};

const renderMethod = module.hot ? render : hydrate;

loadableReady(() => {
	renderMethod(
		<BrowserRouter history={history}>
			<StyleContext.Provider value={{ insertCss }}>
				<App />
			</StyleContext.Provider>
		</BrowserRouter>,
		document.getElementById('root')
	);
});

if (module.hot) {
	module.hot.accept();
}
