import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import BreadcrumbContainer from '../';

const mockCategories = ['category1', 'category2'];
jest.mock('hooks/application', () => ({
	useApplication: jest.fn(() => ({
		categories: mockCategories,
	})),
}));

jest.mock('react-router-dom', () => ({
	Link: jest.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

describe('BreadcrumbContainer', () => {
	it('should render two breadcrumbs', () => {
		//Act
		render(<BreadcrumbContainer />);
		//Assert
		expect(screen.queryAllByTestId('link')).toHaveLength(2);
	});
});
