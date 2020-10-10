const fetch = require('../../utils/fetch');
const { getItems, getItemById } = require('../itemsClient');

jest.mock('../../utils/fetch', () => {
  return jest.fn()
});

describe('Get Items', () => {
    const query = 'test';

    beforeEach(() => {
      fetch.mockImplementation(() => ([
        { id: 10, title: 'item1' },
        { id: 1, title: 'item2' },
      ]))
    });

  it('should call fetch with the right arguments', async() => {
      //Act
      await getItems(query);

      //Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith({ url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}` });
  });

  it('should return an array of items', async() => {
      //Arrange
      const expectedResult = [
        { id: 10, title: 'item1' },
        { id: 1, title: 'item2' },
      ];

      //Act
      const result = await getItems(query);

      //Assert
      expect(result).toEqual(expectedResult);
  });
});

describe('Get Items By Id', () => {
  const id = '123'

  beforeEach(() => {
    fetch
      .mockImplementationOnce(() => ({ id: 10, title: 'item1' }))
      .mockImplementationOnce(() => ({ description: 'description' }))
  });

  it('should call fetch with the right arguments', async () => {
      //Act
      await getItemById(id);

      //Assert
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch.mock.calls[0][0]).toEqual({ url: `${process.env.MELI_API_URL}/items/${id}` });
      expect(fetch.mock.calls[1][0]).toEqual({ url: `${process.env.MELI_API_URL}/items/${id}/description` });
  });

  it('should return an item', async () => {
      //Arrange
      const expectedResult = { 
        id: 10, 
        title: 'item1', 
        description: 'description' 
      }

      //Act
      const result = await getItemById(id);

      //Assert
      expect(result).toEqual(expectedResult);
  });
}); 