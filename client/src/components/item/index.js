import React from 'react';

import Price from 'components/shared/price';

import formatCurrency from 'utils/currency';

import useStyles from 'isomorphic-style-loader/useStyles';
import classes from './index.module.scss';

export default ({ item, onClick }) => {
	useStyles(classes);

	const handleClick = () => {
		if (onClick) onClick(item.id);
	};

	return (
		<div className={classes.container} data-testid='item' onClick={handleClick}>
			<div>
				<img
					className={classes.itemImage}
					src={item.picture}
					alt={item.title}
				/>
			</div>

			<div className={classes.information}>
				<div>
					<div className={classes.priceContainer}>
						<Price customClasses={classes.price} price={item.price} />

						{item.free_shipping && (
							<img
								className={classes.shippingImage}
								src='/assets/ic_shipping@2x.png.png.png'
								alt='Free shipping'
							/>
						)}
					</div>

					<h3>{item.title}</h3>
					<h3>{item.condition}</h3>
				</div>
				<div>
					<span className={classes.address}>{item.address}</span>
				</div>
			</div>
		</div>
	);
};
