import React from 'react';

import { Link } from 'react-router-dom';

import SearchContainer from 'containers/search';

import { HOME } from 'routes/routes';

import { useApplication } from 'hooks/application';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);
	const { setSearchTerm, setResult } = useApplication();

	const handleClick = () => {
		setSearchTerm('');
		setResult({ items: [], categories: [] });
	};

	return (
		<header>
			<div className={classes.root}>
				<div className={classes.container}>
					<div>
						<Link data-testid='logo' to={HOME} onClick={handleClick}>
							<img
								className={classes.logo}
								src='/assets/Logo_ML@2x.png.png.png'
								alt='Logo'
							/>
						</Link>
					</div>

					<SearchContainer />
				</div>
			</div>
		</header>
	);
};
