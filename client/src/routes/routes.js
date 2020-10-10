import loadable from '@loadable/component';

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
		path: '/items',
		component: Results,
		exact: true,
	},
	{
		path: '/items/:id',
		component: Detail,
		exact: true,
	},
	{
		path: '/',
		component: Home,
	},
];
