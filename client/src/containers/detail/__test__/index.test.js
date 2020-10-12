import React from 'react';

import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';

import axios from 'utils/axios';
import { useApplication } from 'hooks/application';

import DetailContainer from '../';

jest.mock('hooks/application', () => ({
	useApplication: jest.fn(),
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
	const mockSetResult = jest.fn();
	const mockResult = {
		items: { id: 10, title: 'item', price: { amount: 300 } },
		categories: ['cat1', 'cat2'],
	};

	it('should show the message and not call axios when there is no item id', async () => {
		useApplication.mockImplementation(() => ({}));

		//Act
		render(<DetailContainer />);

		//Assert
		await waitFor(() => {
			expect(
				screen.getByText(/No se ha encontrado el item/i)
			).toBeInTheDocument();
			expect(axios).not.toBeCalled();
		});
	});

	it('should call axios and set the result', async () => {
		useApplication.mockImplementation(() => ({
			setResult: mockSetResult,
		}));

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
