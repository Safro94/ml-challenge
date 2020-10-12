import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useServerSideData } from '../';

describe('Server side data hook', () => {
	it('it should return the staticContext.initialData', async () => {
		// Arrange
		const staticContext = {
			initialData: 'initialData',
		};

		// Act
		const { result } = renderHook(() => useServerSideData(staticContext));

		// Assert
		expect(result.current).toBe(staticContext.initialData);
	});
});
