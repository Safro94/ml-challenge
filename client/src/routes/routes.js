import loadable from '@loadable/component';

export const HOME = '/';
export const RESULTS = '/items';
export const DETAIL = '/items/:id';

import { getProductDetailData } from 'services/content';

const Home = loadable(() =>
	import(
		/* webpackChunkName: 'Home'  */
		'../pages/home'
	)
);

const Results = loadable(() =>
	import(
		/* webpackChunkName: 'Results'  */
		'../pages/results'
	)
);

const Detail = loadable(() =>
	import(
		/* webpackChunkName: 'Detail'  */
		'../pages/detail'
	)
);

export default [
	{
		path: HOME,
		component: Home,
		exact: true,
	},
	{
		path: DETAIL,
		component: Detail,
		requestInitialData: getProductDetailData,
	},
	{
		path: RESULTS,
		component: Results,
	},
];
