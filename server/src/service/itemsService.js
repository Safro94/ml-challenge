const { getItems } = require('../integration/itemsClient');
const { mapResults } = require('../utils/mapper');

class ItemsService {
  async get(query) {
    const items = await getItems(query);
    return mapResults(items);
  }
}

module.exports = new ItemsService();
