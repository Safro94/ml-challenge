import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { useApplication } from 'hooks/application';

import BreadcrumbContainer from '../';

const mockCategories = ['category1'];
jest.mock('hooks/application', () => ({
	useApplication: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
	Link: jest.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}));

describe('BreadcrumbContainer', () => {
	it('should render two breadcrumbs when propsCategories has two categories', () => {
		//Arrange
		const propsCategories = ['cat1', 'cat2'];
		useApplication.mockImplementation(() => ({ categories: null }));

		//Act
		render(<BreadcrumbContainer categories={propsCategories} />);

		//Assert
		expect(screen.queryAllByTestId('link')).toHaveLength(2);
	});

	it('should render one breadcrumb when there are propsCategories but it has contextCategories', () => {
		//Arrange
		const propsCategories = ['cat1', 'cat2'];
		useApplication.mockImplementation(() => ({ categories: mockCategories }));

		//Act
		render(<BreadcrumbContainer categories={propsCategories} />);

		//Assert
		expect(screen.queryAllByTestId('link')).toHaveLength(1);
	});

	it('should render one breadcrumb when there are no propsCategories but it has contextCategories', () => {
		//Arrange
		useApplication.mockImplementation(() => ({ categories: mockCategories }));

		//Act
		render(<BreadcrumbContainer />);

		//Assert
		expect(screen.queryAllByTestId('link')).toHaveLength(1);
	});
});
