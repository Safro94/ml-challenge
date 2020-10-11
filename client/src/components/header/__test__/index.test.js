import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Link } from 'react-router-dom';

import Header from '../';

jest.mock('react-router-dom', () => ({
	useHistory: () => ({ push: {} }),
	Link: jest.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

jest.mock('hooks/application', () => ({
	useApplication: jest.fn(() => ({
		setSearchTerm: jest.fn(),
	})),
}));

describe('Header', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Header />);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should go to the results page when the logo is clicked', async () => {
		//Act
		render(<Header />);
		userEvent.click(screen.getByTestId('logo'));

		//Assert
		expect(Link).toHaveBeenCalledTimes(1);
		expect(Link.mock.calls[0][0].to).toBe('/');
	});
});
