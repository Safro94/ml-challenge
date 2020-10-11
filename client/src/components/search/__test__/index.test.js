import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Search from '../';

import { useApplication } from 'hooks/application';

jest.mock('hooks/application', () => ({
	useApplication: jest.fn(),
}));

describe('Search', () => {
	it('should have the term in the input', () => {
		//Arrange
		const term = 'test term';
		useApplication.mockImplementation(() => ({ term }));

		//Act
		render(<Search />);

		//Assert
		expect(screen.getByDisplayValue(/test term/i)).toBeInTheDocument();
	});

	it('should not have the term in the input', () => {
		//Arrange
		useApplication.mockImplementation(() => ({ term: null }));

		//Act
		render(<Search />);

		//Assert
		expect(screen.queryByDisplayValue(/test term/i)).not.toBeInTheDocument();
	});

	it('should call onSubmit', () => {
		//Arrange
		const onSubmit = jest.fn();
		const term = 'test';

		//Act
		render(<Search onSubmit={onSubmit} />);
		const button = screen.getByRole('button');

		//Assert
		expect(button).toBeDisabled();
		userEvent.type(screen.getByPlaceholderText(/Nunca dejes de buscar/i), term);

		expect(button).not.toBeDisabled();
		userEvent.click(button);

		expect(onSubmit).toHaveBeenCalledTimes(1);
		expect(onSubmit).toHaveBeenCalledWith(term);
	});

	it('should render OK', () => {
		//Act
		const { container } = render(<Search />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
