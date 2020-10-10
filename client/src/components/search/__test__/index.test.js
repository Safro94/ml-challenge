import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Search from '../';

describe('Search', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Search />);

		//Assert
		expect(container).toMatchSnapshot();
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
});
