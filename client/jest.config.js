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
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/src/routes/',
		'<rootDir>/src/server/',
		'<rootDir>/src/styles/',
		'<rootDir>/src/client.js',
		'<rootDir>/src/index.js',
	],
	moduleNameMapper: {
		'\\.(css|scss|sass)': 'identity-obj-proxy',
	},
};
