import React from 'react';

import { render, screen } from '@testing-library/react';

import ItemsContainer from 'containers/items';
import BreadcrumbContainer from 'containers/breadcrumb';

import Results from '../';

jest.mock('containers/items', () => {
	return jest.fn(() => <div>items</div>);
});

jest.mock('containers/breadcrumb', () => {
	return jest.fn(() => <div>breadcrumb</div>);
});

describe('Results', () => {
	it('should render breadcrumb and items', () => {
		//Act
		render(<Results />);

		//Assert
		expect(screen.getByText(/items/i)).toBeInTheDocument();
		expect(screen.getByText(/breadcrumb/i)).toBeInTheDocument();

		expect(ItemsContainer).toHaveBeenCalledTimes(1);
		expect(BreadcrumbContainer).toHaveBeenCalledTimes(1);

		expect(ItemsContainer).toHaveBeenCalledWith({}, {});
		expect(BreadcrumbContainer).toHaveBeenCalledWith({}, {});
	});
});
