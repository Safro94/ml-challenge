import loadable from '@loadable/component';

export const HOME = '/';
export const RESULTS = '/items';
export const DETAIL = '/items/:id';

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
		path: RESULTS,
		component: Results,
		exact: true,
	},
	{
		path: DETAIL,
		component: Detail,
		exact: true,
	},
	{
		path: HOME,
		component: Home,
	},
];
