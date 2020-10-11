const ItemsService = require('../itemsService');
const { mapResults, mapItemDetail } = require('../../utils/mapper');
const { getItems, getItemById, getCategoryById } = require('../../integration/itemsClient');

const mockItems = { items: 'items' };
const mockItemDetail = { category_id:1 };
const mockCategories = [{ category: 'category' }];
jest.mock('../../utils/mapper', () => {
  return {
    mapResults: jest.fn(() => mockItems),
    mapItemDetail: jest.fn(() => mockItemDetail)
  }
});

jest.mock('../../integration/itemsClient', () => {
  return {
    getItems: jest.fn(() => mockItems),
    getItemById: jest.fn(() => mockItemDetail),
    getCategoryById: jest.fn(() => mockCategories)
  }
});

describe('Get items', () => {
  const query = 'test';
  const limit = 1;
  
  it('should call getItems', async () => {
    //Act
    await ItemsService.get(query, limit);

    //Assert
    expect(getItems).toHaveBeenCalledTimes(1);
    expect(getItems).toHaveBeenCalledWith(query, limit);
  });

  it('should mapResults and return the response', async () => {
    //Act
    const result = await ItemsService.get(query, limit);

    //Assert
    expect(mapResults).toHaveBeenCalledTimes(1);
    expect(mapResults).toHaveBeenCalledWith(mockItems);
    expect(result).toEqual(mockItems);
  });
});

describe('Get Items By Id', () => {
  const id = '123';

  it('should call getById and getCategoryById', async () => {
    //Act
    await ItemsService.getById(id);

    //Assert
    expect(getItemById).toHaveBeenCalledTimes(1);
    expect(getItemById).toHaveBeenCalledWith(id);

    expect(getCategoryById).toHaveBeenCalledTimes(1);
    expect(getCategoryById).toHaveBeenCalledWith(mockItemDetail.category_id);
  });

  it('should mapItemDetail and return the response', async () => {
    //Act
    const result = await ItemsService.getById(id);

    //Assert
    expect(mapItemDetail).toHaveBeenCalledTimes(1);
    expect(mapItemDetail).toHaveBeenCalledWith(mockItemDetail, mockCategories);
    expect(result).toEqual(mockItemDetail);
  });
}); 