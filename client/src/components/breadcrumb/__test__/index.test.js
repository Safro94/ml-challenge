import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { Link } from 'react-router-dom';

import { HOME } from 'routes/routes';

import Breadcrumb from '../';

jest.mock('react-router-dom', () => ({
	Link: jest.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

describe('Breadcrumb', () => {
	const category = 'category';

	it('should render OK when isLast is false', () => {
		//Act
		const { container } = render(
			<Breadcrumb category={category} isLast={false} />
		);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should render OK when isLast is true', () => {
		//Act
		const { container } = render(<Breadcrumb category={category} isLast />);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should have a > when it is not the last item', () => {
		//Act
		render(<Breadcrumb category={category} isLast={false} />);

		//Assert
		expect(screen.getByText(/>/)).toBeInTheDocument();
	});

	it('should not have a > when it is the last item', () => {
		//Act
		render(<Breadcrumb category={category} isLast />);

		//Assert
		expect(screen.queryByText(/>/)).not.toBeInTheDocument();
	});

	it('should go to the path when the link is clicked', () => {
		//Arrange
		const path = '/path';

		//Act
		render(<Breadcrumb category={category} path={path} />);
		userEvent.click(screen.getByTestId('link'));

		//Assert
		expect(Link).toHaveBeenCalledTimes(1);
		expect(Link.mock.calls[0][0].to).toBe(path);
	});

	it('should go to the home page when the link is clicked and there is no path', () => {
		//Act
		render(<Breadcrumb category={category} />);
		userEvent.click(screen.getByTestId('link'));

		//Assert
		expect(Link).toHaveBeenCalledTimes(1);
		expect(Link.mock.calls[0][0].to).toBe(HOME);
	});
});
