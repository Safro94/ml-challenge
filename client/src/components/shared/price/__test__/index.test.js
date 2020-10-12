import React from 'react';

import { render } from '@testing-library/react';

import formatCurrency from 'utils/currency';

import Price from '../';

jest.mock('utils/currency', () => jest.fn(() => '300,50'));

describe('Price', () => {
	const price = {
		currency: '$',
		amount: 300,
		decimals: 50,
	};

	it('should render OK', () => {
		//Act
		const { container } = render(<Price price={price} />);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should call formatCurrency', () => {
		//Act
		render(<Price price={price} />);

		//Assert
		expect(formatCurrency).toHaveBeenCalledTimes(1);
		expect(formatCurrency).toHaveBeenCalledWith({
			amount: price.amount,
			decimals: price.decimals,
		});
	});
});
