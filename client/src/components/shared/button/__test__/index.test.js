import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Button from '../';

describe('Button', () => {
	it('should render OK', () => {
		//Act
		const { container } = render(
			<Button>
				<h1>Test</h1>
			</Button>
		);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should call onclick', () => {
		//Arrange
		const onClick = jest.fn();

		//Act
		render(
			<Button onClick={onClick}>
				<h1>Test</h1>
			</Button>
		);
		userEvent.click(screen.getByRole('button'));

		//Assert
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
