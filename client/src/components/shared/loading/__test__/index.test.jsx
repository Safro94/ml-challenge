import React from 'react';

import { render } from '@testing-library/react';

import Loading from '../';

describe('Loading', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(<Loading />);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
