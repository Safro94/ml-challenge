import React from 'react';

import { render } from '@testing-library/react';

import Description from '../';

describe('Description', () => {
	it('should render OK', () => {
		//Arrange
		const description = '<h2>description</h2>';
		//Act
		const { container } = render(<Description description={description} />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
