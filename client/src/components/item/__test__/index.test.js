import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import formatCurrency from 'utils/currency';

import Item from '../';

jest.mock('utils/currency', () => jest.fn(() => '300,50'));

describe('Item', () => {
	const onClick = jest.fn();
	const item = {
		picture: 'a.jpg',
		title: 'title',
		price: {
			amount: 300,
			decimals: 50,
		},
		condition: 'new',
		address: 'address',
	};

	it('should render without free shipping', () => {
		//Act
		const { container } = render(<Item item={item} />);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should render with free shipping', () => {
		//Arrange
		item.free_shipping = true;

		//Act
		const { container } = render(<Item item={item} />);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should call onclick', () => {
		//Act
		render(<Item item={item} onClick={onClick} />);
		userEvent.click(screen.getByTestId('item'));

		//Assert
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(item.id);
	});

	it('should call formatCurrency', () => {
		//Act
		render(<Item item={item} />);

		//Assert
		expect(formatCurrency).toHaveBeenCalledTimes(1);
		expect(formatCurrency).toHaveBeenCalledWith({
			amount: item.price.amount,
			decimals: item.price.decimals,
		});
	});
});
