import React from 'react';

import { render } from '@testing-library/react';

import Error from '../';

describe('Error', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Error />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
