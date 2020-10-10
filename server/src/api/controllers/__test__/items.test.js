const { getItems, getItemById } = require('../items');
const ItemsService = require('../../../service/itemsService');
const { mockReq, mockRes } = require('../../../testUtils/helpers');

const mockItems = [
  { id: 10, title: 'item1' },
  { id: 1, title: 'item2' },
];

const mockItem = {
  id: 10, 
  title: 'item1', 
  description: 'description' 
};

jest.mock('../../../service/itemsService', () => {
    return {
      get: jest.fn(() => mockItems),
      getById: jest.fn(() => mockItem)
    }
});

describe('Get Items', () => {
    const res = mockRes();
    const req = mockReq({
      query: { q: 'test' },
    });

    beforeEach(() => {
      getItems(req, res);
    });

  it('should call ItemsService.get with the right arguments', () => {
      //Assert
      expect(ItemsService.get).toHaveBeenCalledTimes(1);
      expect(ItemsService.get).toHaveBeenCalledWith(req.query.q);
    });

  it('should call res.json with the mapResults response', () => {
      //Assert
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockItems);
    });
});

describe('Get Items By Id', () => {
    const res = mockRes();
    const req = mockReq({
      params: { id: '123' },
    });

    beforeEach(async () => {
      await getItemById(req, res);
    });

    it('should call ItemsService.getById with the right arguments', () => {
      //Assert
      expect(ItemsService.getById).toHaveBeenCalledTimes(1);
      expect(ItemsService.getById).toHaveBeenCalledWith(req.params.id);
    });

    it('should call res.json with the mapItemDetail response', () => {
      //Assert
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockItem);
    });
}); 