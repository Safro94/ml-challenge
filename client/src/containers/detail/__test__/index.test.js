import React from 'react';

import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';

import axios from 'utils/axios';

import DetailContainer from '../';

const mockSetResult = jest.fn();
jest.mock('hooks/application', () => ({
	useApplication: jest.fn(() => ({
		setResult: mockSetResult,
	})),
}));

jest.mock('utils/axios', () =>
	jest.fn().mockResolvedValue({
		data: {
			item: { id: 10, title: 'item', price: { amount: 300 } },
			categories: ['cat1', 'cat2'],
		},
	})
);

describe('DetailContainer', () => {
	const itemId = 10;
	const mockResult = {
		categories: ['cat1', 'cat2'],
	};

	it('should show the loader when there is no item', async () => {
		//Act
		render(<DetailContainer />);

		//Assert
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('should call axios and set the result', async () => {
		//Act
		render(<DetailContainer itemId={itemId} />);

		//Assert
		await waitFor(() => {
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(`/items/${itemId}`);

			expect(mockSetResult).toHaveBeenCalledTimes(1);
			expect(mockSetResult).toHaveBeenCalledWith(mockResult);
		});
	});
});
