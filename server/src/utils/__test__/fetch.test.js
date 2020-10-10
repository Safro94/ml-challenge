jest.dontMock('../fetch');

const fetch = require('../fetch');
const nodeFetch = require('node-fetch')

jest.mock('node-fetch');

describe.each([
    ['http://localhost:port', { test }],
    ['http://localhost:port', { 'Authorization': 'Bearer abc' }],
    ['http://localhost:port', null, 'post']
])('Fetch arguments',(url, headers, method) => {
    it('should call fetch with the right arguments', async() => {
        //Act
        await fetch({ url, headers, method });

        //Assert
        expect(nodeFetch).toHaveBeenCalledTimes(1);
        expect(nodeFetch).toHaveBeenCalledWith(url, {
            method: method || 'get',
            headers: {
                ...headers || '',
                'Content-Type': 'application/json'
            },
        });
    });
});

describe('Fetch', () => {
    const params = { url: 'url' };
    const fetchResult = { test }

    it('should return a json', async() => {
        //Arrange
        nodeFetch.mockImplementation(() => {
            return {
                json: () => {
                    return {
                        test
                    }
                }
            }
        });

        //Act
        const result = await fetch(params);

        //Assert
        expect(result).toEqual(fetchResult);
    });

    it('should return undefined', async() => {
        //Arrange
        nodeFetch.mockImplementation(() => null);

        //Act
        const result = await fetch(params);

        //Assert
        expect(result).not.toBeDefined();
    });
});