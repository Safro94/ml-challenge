import React from 'react';

import { render } from '@testing-library/react';

import Home from '../';

describe('Home', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Home />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
