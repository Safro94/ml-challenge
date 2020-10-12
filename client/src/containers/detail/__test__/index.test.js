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
			item: { id: 10, title: 'item', price: { currency: '$', amount: 300 } },
			categories: ['cat1', 'cat2'],
		},
	})
);

describe('Detail Container', () => {
	const itemId = 10;
	const mockResult = {
		categories: ['cat1', 'cat2'],
	};

	it('should show the loader when there is no item', () => {
		//Act
		render(<DetailContainer />);

		//Assert
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('should show the item when there is no data', async () => {
		//Act
		render(<DetailContainer itemId={itemId} />);

		//Assert
		await waitFor(() => {
			expect(screen.getByTestId('item')).toBeInTheDocument();

			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(`/items/${itemId}`);

			expect(mockSetResult).toHaveBeenCalledTimes(1);
			expect(mockSetResult).toHaveBeenCalledWith(mockResult);
		});
	});

	it('should show the item when data has item', async () => {
		//Arrange
		const data = {
			item: { id: 10, title: 'item', price: { currency: '$', amount: 300 } },
		};

		//Act
		render(<DetailContainer data={data} itemId={itemId} />);

		//Assert
		expect(screen.getByTestId('item')).toBeInTheDocument();
		expect(axios).not.toBeCalled();
	});

	it('should show the message if the item was not found', async () => {
		//Arrange
		axios.mockResolvedValue(() => ({ data: { item: null } }));

		//Act
		render(<DetailContainer itemId={itemId} />);

		//Assert
		await waitFor(() => {
			expect(
				screen.getByText(/No se ha encontrado el item/i)
			).toBeInTheDocument();

			expect(axios).toHaveBeenCalledTimes(1);
			expect(mockSetResult).toHaveBeenCalledTimes(1);
		});
	});
});
