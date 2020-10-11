import React from 'react';

import { Link } from 'react-router-dom';

import { HOME } from 'routes/routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

/*
	En este caso no tenemos especificado donde deberia ir cuando
	se hace click en el breadcrumb, pero debería mandar al usuario
	a alguna pagina anterior hacer click, por eso es que recibe un path
	con default a la home
*/
export default ({ path = HOME, category, isLast }) => {
	useStyles(classes);

	return (
		<li className={classes.breadcrumb}>
			<Link
				to={path}
				className={isLast ? `${classes.link} ${classes.last}` : classes.link}
				data-testid='link'
			>
				{category}
			</Link>
			{!isLast && <span> {'>'} </span>}
		</li>
	);
};
