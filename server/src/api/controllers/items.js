const ItemsService = require('../../service/itemsService');

const getItems = async (req, res) => {
  const { q } = req.query;
  const items = await ItemsService.get(q);
  res.json(items);
};

const getItemById = () => {};

module.exports = { getItems, getItemById };
