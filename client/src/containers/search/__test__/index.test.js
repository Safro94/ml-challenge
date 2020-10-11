import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import SearchContainer from '../';

import { RESULTS } from 'routes/routes';

const mockSetSearchTerm = jest.fn();
jest.mock('hooks/application', () => ({
	useApplication: jest.fn(() => ({
		setSearchTerm: mockSetSearchTerm,
	})),
}));

const mockUseHistory = jest.fn();
jest.mock('react-router-dom', () => ({
	useHistory: () => ({ push: mockUseHistory }),
}));

describe('SearchContainer', () => {
	const term = 'test';

	beforeEach(() => {
		render(<SearchContainer />);
		userEvent.type(screen.getByPlaceholderText(/Nunca dejes de buscar/i), term);
		userEvent.click(screen.getByRole('button'));
	});

	it('should call setSearchTerm', () => {
		//Assert
		expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
		expect(mockSetSearchTerm).toHaveBeenCalledWith(term);
	});

	it('should make a history push to results', () => {
		//Assert
		expect(mockUseHistory).toHaveBeenCalledTimes(1);
		expect(mockUseHistory).toHaveBeenCalledWith(RESULTS);
	});
});
