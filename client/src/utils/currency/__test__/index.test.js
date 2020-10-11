import formatCurrency from '../';

describe('Format currency', () => {
	it('should return undefined', () => {
		//Act
		const result = formatCurrency({});

		//Assert
		expect(result).not.toBeDefined();
	});

	it('should return a number with 0 as decimals', () => {
		//Act
		const result = formatCurrency({ amount: 300 });

		//Assert
		expect(result).toBe('300.00');
	});

	it('should return a number with decimals', () => {
		//Act
		const result = formatCurrency({ amount: 300, decimals: 50 });

		//Assert
		expect(result).toBe('300.50');
	});
});
