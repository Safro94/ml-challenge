const fetch = require('../../utils/fetch');
const { getItems, getItemById, getCategoryById } = require('../itemsClient');

jest.mock('../../utils/fetch', () => {
  return jest.fn()
});

describe('Get Items', () => {
  const query = 'test';
  const results = [
    { id: 10, title: 'item1' },
    { id: 1, title: 'item2' },
  ];

  beforeEach(() => {
    fetch.mockImplementation(() => results)
  });

  it('should call fetch only with q if there is no limit', async () => {
      //Act
      await getItems(query);

      //Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith({ url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}` });
  });

  it('should call fetch with q and limit if there is a limit', async () => {
      //Arrange
      const limit = 10;

      //Act
      await getItems(query, limit);

      //Assert
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith({ url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}&limit=${limit}` });
  });

  it('should return an array of items', async () => {
      //Act
      const result = await getItems(query);

      //Assert
      expect(result).toEqual(results);
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

describe('Get Category By Id', () => {
  const id = 'MLA1055';
  const categories = [
    { name: 'category1' },
    { name: 'category2' },
  ]

  beforeEach(() => {
    fetch.mockImplementation(() => categories)
  });

  it('should call fetch', async () => {
    //Act
    await getCategoryById(id);

    //Assert
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith({ url: `${process.env.MELI_API_URL}/categories/${id}` });
  });

  it('should return an array of categories', async () => {
    //Act
    const result = await getCategoryById(id);

    //Assert
    expect(result).toEqual(categories);
  });
});