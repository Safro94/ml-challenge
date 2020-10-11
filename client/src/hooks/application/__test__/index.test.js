import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useApplication, ApplicationProvider } from '../';

describe('Application hook', () => {
	it('it should return the search term when setSearchTerm is called', async () => {
		// Arrange
		const term = 'test';

		// Act
		const { result } = renderHook(() => useApplication(), {
			wrapper: ({ children }) => (
				<ApplicationProvider>{children}</ApplicationProvider>
			),
		});

		act(() => result.current.setSearchTerm(term));

		// Assert
		expect(result.current.term).toEqual(term);
	});

	it('it should return the items and categories when setResult is called', async () => {
		// Arrange
		const items = [
			{
				id: 1,
				description: 'description',
			},
			{
				id: 2,
				description: 'description2',
			},
		];

		const categories = ['cat1', 'cat2', 'cat3'];

		// Act
		const { result } = renderHook(() => useApplication(), {
			wrapper: ({ children }) => (
				<ApplicationProvider>{children}</ApplicationProvider>
			),
		});

		act(() => result.current.setResult({ items, categories }));

		// Assert
		expect(result.current.items).toEqual(items);
		expect(result.current.categories).toEqual(categories);
	});
});
