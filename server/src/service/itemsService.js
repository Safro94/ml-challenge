const { getItems, getItemById, getCategoryById } = require('../integration/itemsClient');
const { mapResults, mapItemDetail } = require('../utils/mapper');

class ItemsService {
  async get(query, limit) {
    const items = await getItems(query, limit);
    return mapResults(items);
  }

  async getById(id) {
    const item = await getItemById(id);
    if(item.status === 404) return mapItemDetail(null);

    const categories = await getCategoryById(item.category_id);
    return mapItemDetail(item, categories);
  }
}

module.exports = new ItemsService();
