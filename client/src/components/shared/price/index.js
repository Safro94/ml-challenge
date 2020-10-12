import React from 'react';

import formatCurrency from 'utils/currency';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ customClasses, price, currencyCode = '$' }) => {
	useStyles(classes);

	const formattedPrice = formatCurrency({
		amount: price?.amount,
		decimals: price?.decimals,
	}).split(',');

	return (
		<h1
			className={
				customClasses ? `${classes.price} ${customClasses}` : classes.price
			}
		>
			<span className={classes.currencyCode}>{price?.currency}</span>
			{formattedPrice?.length && (
				<>
					<span>{formattedPrice[0]}</span>
					<span className={classes.decimals}>{formattedPrice[1]}</span>
				</>
			)}
		</h1>
	);
};
