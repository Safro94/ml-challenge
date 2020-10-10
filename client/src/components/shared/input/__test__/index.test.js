import React from 'react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import Input from '../';

describe('Input', () => {
	const onChange = jest.fn();
	const value = 1;

	it('should render OK', () => {
		//Act
		const { container } = render(
			<Input placeholder='placeholder' value={value} onChange={onChange} />
		);

		//Assert
		expect(container).toMatchSnapshot();
	});

	it('should call onclick', () => {
		//Act
		render(<Input onChange={onChange} value={1} />);
		userEvent.type(screen.getByRole('textbox'), 't');

		//Assert
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
