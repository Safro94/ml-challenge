const ItemsService = require('../../service/itemsService');

const getItems = async (req, res) => {
  const { q } = req.query;
  const items = await ItemsService.get(q);
  res.json(items);
};

const getItemById = async (req, res) => {
  const { id } = req.params;
  const item = await ItemsService.getById(id);
  res.json(item);
};

module.exports = { getItems, getItemById };
