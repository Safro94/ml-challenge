import React from 'react';

import { render } from '@testing-library/react';

import Detail from '../';

jest.mock('react-router-dom', () => ({
	useParams: () => ({ id: 10 }),
}));

jest.mock('hooks/application', () => ({
	useApplication: jest.fn(() => ({
		items: [{ id: 10, title: 'item', price: { amount: 30, decimals: 50 } }],
		setResult: jest.fn(),
	})),
}));

jest.mock('utils/currency', () => jest.fn(() => '300,50'));

describe('Detail', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Detail />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
