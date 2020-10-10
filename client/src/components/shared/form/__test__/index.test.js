import React from 'react';
import { render } from '@testing-library/react';

import Form from '..';

describe('Form', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(
			<Form>
				<h1>Test</h1>
			</Form>
		);

		//Assert
		expect(container).toMatchSnapshot();
	});
});
