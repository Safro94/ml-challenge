import React from 'react';

import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import axios from 'utils/axios';
import { useApplication } from 'hooks/application';
import { DETAIL } from 'routes/routes';

import ItemsContainer from '../';

jest.mock('hooks/application', () => ({
	useApplication: jest.fn(),
}));

jest.mock('utils/axios', () =>
	jest.fn().mockResolvedValue({
		data: {
			items: [{ id: 10, title: 'item', price: { amount: 300 } }],
			categories: ['cat1', 'cat2'],
		},
	})
);

const mockUseHistory = jest.fn();
jest.mock('react-router-dom', () => ({
	useHistory: () => ({ push: mockUseHistory }),
}));

describe('ItemsContainer', () => {
	const mockTerm = 'term';
	const mockSetResult = jest.fn();
	const mockResult = {
		items: [{ id: 10, title: 'item', price: { amount: 300 } }],
		categories: ['cat1', 'cat2'],
	};

	it('should show the message and not call axios when there is no term', async () => {
		useApplication.mockImplementation(() => ({}));

		//Act
		render(<ItemsContainer />);

		//Assert
		await waitFor(() => {
			expect(
				screen.getByText(/No se han encontrado resultados para tu busqueda/i)
			).toBeInTheDocument();
			expect(axios).not.toBeCalled();
		});
	});

	it('should call axios and set the result', async () => {
		useApplication.mockImplementation(() => ({
			term: mockTerm,
			setResult: mockSetResult,
		}));

		//Act
		render(<ItemsContainer />);

		//Assert
		await waitFor(() => {
			expect(axios).toHaveBeenCalledTimes(1);
			expect(axios).toHaveBeenCalledWith(`/items?q=${mockTerm}&limit=4`);

			expect(mockSetResult).toHaveBeenCalledTimes(1);
			expect(mockSetResult).toHaveBeenCalledWith(mockResult);
		});
	});

	it('should do a history push', async () => {
		useApplication.mockImplementation(() => ({ items: mockResult.items }));

		//Act
		render(<ItemsContainer />);

		//Assert
		expect(mockUseHistory).not.toBeCalled();

		await waitFor(() => {
			userEvent.click(screen.getByTestId('item'));

			expect(mockUseHistory).toHaveBeenCalledTimes(1);
			expect(mockUseHistory).toHaveBeenCalledWith(
				DETAIL.replace(':id', mockResult.items[0].id)
			);
		});
	});
});
