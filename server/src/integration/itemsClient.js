const fetch = require('../utils/fetch');

const getItems = async (query, queryLimit) => {
  const limit = queryLimit ? `&limit=${queryLimit}` : '';
  const data = await fetch({
    url: `${process.env.MELI_API_URL}/sites/MLA/search?q=${query}${limit}`,
  });

  return data;
};

const getItemById = async id => {
  const endpoint = `${process.env.MELI_API_URL}/items/${id}`;

  const getItem = () => fetch({ url: endpoint });

  const getItemDescription = () => fetch({ url: `${endpoint}/description` });

  const [item, description] = await Promise.all([
    getItem(),
    getItemDescription(),
  ]);

  return { ...item, ...description };
};

const getCategoryById = async id => {
  const data = await fetch({
    url: `${process.env.MELI_API_URL}/categories/${id}`,
  });

  return data;
}

module.exports = {
  getItems,
  getItemById,
  getCategoryById
};
