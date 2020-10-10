const { getItems, getItemById } = require('../integration/itemsClient');
const { mapResults, mapItemDetail } = require('../utils/mapper');

class ItemsService {
  async get(query) {
    const items = await getItems(query);
    return mapResults(items);
  }

  async getById(id) {
    const item = await getItemById(id);
    return mapItemDetail(item);
  }
}

module.exports = new ItemsService();
