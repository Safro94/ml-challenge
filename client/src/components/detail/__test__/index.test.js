import React from 'react';

import { render } from '@testing-library/react';

import Detail from '../';

describe('Detail', () => {
	it('should render OK', () => {
		//Arrange
		const item = {
			picture: 'a.jpg',
			title: 'title',
			condition: 'new',
			sold_quantity: 20,
			price: {
				currency: '$',
				amount: 30,
				decimals: 50,
			},
		};

		//Act
		const { container } = render(<Detail item={item} />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
