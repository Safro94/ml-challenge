module.exports = {
	roots: ['<rootDir>/src'],
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	coverageReporters: ['text', 'html'],
	testPathIgnorePatterns: ['/mocks', '/node_modules/'],
	collectCoverageFrom: [
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/__test__/**',
		'!**/__tests__/**',
	],
	moduleNameMapper: {
		'\\.(css|scss|sass)': 'identity-obj-proxy',
	},
};
