import React from 'react';

import { render, screen } from '@testing-library/react';

import DetailContainer from 'containers/detail';
import BreadcrumbContainer from 'containers/breadcrumb';

import { useServerSideData } from 'hooks/serverData';

import Detail from '../';

const mockId = 10;
jest.mock('react-router-dom', () => ({
	useParams: () => ({ id: mockId }),
}));

const mockItem = { id: 10, title: 'title' };
const mockCategories = ['category', 'category'];
jest.mock('hooks/serverData', () => ({
	useServerSideData: jest.fn(),
}));

jest.mock('utils/currency', () => jest.fn(() => '300,50'));

jest.mock('containers/detail', () => {
	return jest.fn(({ data }) => <div>{data?.item?.title}</div>);
});

jest.mock('containers/breadcrumb', () => {
	return jest.fn(data => (
		<div>
			{data?.categories?.map((category, index) => (
				<span key={index}>{category}</span>
			))}
		</div>
	));
});

describe('Detail', () => {
	it('should render the items if staticContext.initialData has data', () => {
		//Arrange
		const staticContext = {
			initialData: {
				item: mockItem,
				categories: mockCategories,
			},
		};

		useServerSideData.mockImplementation(() => ({
			categories: mockCategories,
			item: mockItem,
		}));

		//Act
		render(<Detail staticContext={staticContext} />);

		//expect
		expect(screen.getByText(mockItem.title)).toBeInTheDocument();
		expect(screen.queryAllByText('category')).toHaveLength(2);

		expect(DetailContainer).toHaveBeenCalledTimes(1);
		expect(BreadcrumbContainer).toHaveBeenCalledTimes(1);

		expect(DetailContainer.mock.calls[0][0].data).toEqual(
			staticContext.initialData
		);
		expect(DetailContainer.mock.calls[0][0].itemId).toBe(mockId);

		expect(BreadcrumbContainer.mock.calls[0][0].categories).toEqual(
			staticContext.initialData.categories
		);
	});

	it('should not render the items if staticContext.initialData has no data', () => {
		//Arrange
		useServerSideData.mockImplementation(() => null);

		//Act
		render(<Detail />);

		//expect
		expect(screen.queryByText(mockItem.title)).not.toBeInTheDocument();
		expect(screen.queryAllByText('category')).toHaveLength(0);

		expect(DetailContainer).toHaveBeenCalledTimes(1);
		expect(BreadcrumbContainer).toHaveBeenCalledTimes(1);

		expect(DetailContainer.mock.calls[0][0].data).toBeNull();
		expect(DetailContainer.mock.calls[0][0].itemId).toBe(mockId);

		expect(BreadcrumbContainer.mock.calls[0][0].categories).not.toBeDefined();
	});
});
