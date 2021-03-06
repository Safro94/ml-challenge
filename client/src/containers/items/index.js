import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';

import Item from 'components/item';
import Loading from 'components/shared/loading';

import { useApplication } from 'hooks/application';

import axios from 'utils/axios';

import { DETAIL } from 'routes/routes';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default () => {
	useStyles(classes);
	const history = useHistory();
	const { term, items, setResult, setSearchTerm } = useApplication();
	const handleError = useErrorHandler();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getItems = () => {
			const limit = 4;
			axios(`/items?q=${term}&limit=${limit}`).then(res => {
				const result = {
					items: res.data?.items,
					categories: res.data?.categories,
				};

				setResult(result);
				setLoading(false);
			}, handleError);
		};

		if (term) {
			getItems();
		}
	}, [term, setResult]);

	const handleClick = id => {
		setSearchTerm('');
		history.push(DETAIL.replace(':id', id));
	};

	if (term && loading) return <Loading />;

	return (
		<div className={classes.container}>
			{items ? (
				items.map(item => (
					<Item key={item.id} item={item} onClick={handleClick} />
				))
			) : (
				<>
					{term && (
						<h1 className={classes.error}>
							No se han encontrado resultados para tu busqueda
						</h1>
					)}
				</>
			)}
		</div>
	);
};
