import { getProductDetailData } from 'services/content';

import axios from 'utils/axios';

jest.mock('utils/axios', () =>
	jest.fn().mockResolvedValue({
		data: 'response',
	})
);

describe('Content Service', () => {
	const req = { url: '/items/1' };

	it('should call axios and return the axios response', async () => {
		//Act
		const result = await getProductDetailData(req);

		//Assert
		expect(axios).toHaveBeenCalledTimes(1);
		expect(axios).toHaveBeenCalledWith('/items/1');
		expect(result).toBe('response');
	});
});
