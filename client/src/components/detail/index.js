import React from 'react';

import Button from 'components/shared/button';
import Price from 'components/shared/price';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ item }) => {
	useStyles(classes);

	return (
		<>
			<div className={classes.imageContainer}>
				<img className={classes.image} src={item.picture} alt={item.title} />
			</div>
			<div className={classes.information}>
				<h4 className={classes.quantity}>
					{item.condition} - {item.sold_quantity} vendidos
				</h4>
				<h2 className={classes.title}>{item.title}</h2>
				<Price customClasses={classes.price} price={item.price} />
				<div>
					<Button customClasses={classes.button}>Comprar</Button>
				</div>
			</div>
		</>
	);
};
